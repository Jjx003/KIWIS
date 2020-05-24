var firebase = require('../firebase');
var auth = require('../auth/index');

function getCompanyName(user_id) {
    return new Promise(function (resolve, reject) {
        firebase.db.database().ref('/UserCompaniesID/' + user_id).once('value').then((snapshot) => {
            resolve(snapshot.val());
        }).catch((error) => {
            reject(new Error(error));
        });
    });
}
// add database functions below

// NOTE (Eric): in order to get userId: firebase.auth().currentUser.uid
// Also, forumDBRef requires the forumName so they can access the specific company

// "POST" method for new tags
function createNewTag(forumName, tagName) {
    const forumDBRef = firebase.db.database().ref(forumName);
    var tag = {};
    tag[tagName] = {count: 0};
    forumDBRef.child("Tags").update(tag);
}

// "GET" method for tags in forums 
function getTags(forumName) {
    return firebase.db.database().ref(forumName).child('Tags').once('value');
}

// "GET" method for a tag's number 
function getTagCount(forumName, tagName) {
    return firebase.db.database().ref(forumName).child('Tags/' + tagName).once('value');
}

// Removes a tag from the company
function removeTag(forumName, tagName) {
    firebase.db.database().ref(forumName).child('Tags').child(tagName).remove();
    removeTagFromAllUsers(forumName, tagName);

}

// Removes the tags from the users of a company
function removeTagFromAllUsers(forumName, tagName) {
    const forumDBRef = firebase.db.database().ref(forumName);
    forumDBRef.child('Users').once('value').then((data) => {

        // Goes to every user
        data.forEach(function (child) {
            child.forEach(function (grandchild) {

                // goes to the tags object in the user
                if(grandchild.key === 'tags') {
                    console.log(grandchild.key + " : " + grandchild.val());

                    // Checks every tag and removes the one that doesn't matter
                    grandchild.forEach(function (tagNameChild) {

                        //Checks which tag to remove
                        if(tagNameChild.val() === tagName) {
                            forumDBRef.child('Users/' + child.key).child('tags/' + tagNameChild.key).remove()
                        }
                    });
                }
            });
        });
    });
}	

// "POST" method for a new user 
function createNewUser(forumName, firstName, lastName, email, password) {
    const forumDBRef = firebase.db.database().ref(forumName);
    auth.signUp(email, password).then((data) => {
        var userID = data.user.uid
        var user = {};

        // Creates a new user object with the userID as a key
        user[userID] =  {
            firstName: firstName,
            lastName: lastName,
            email: email,
            admin: false,
            tags: ['announcements', 'help-needed'],
            following_IDs: []
        };
        forumDBRef.child("Users").update(user);

        var mapUserToCompany = {};
        mapUserToCompany[userID] = forumName;
        firebase.db.database().ref("UserCompaniesID").update(mapUserToCompany);
    });
}

// "GET" method for a user's id
function getCurrentUserID(token) {
    return new Promise(function(resolve, reject) {
        firebase.admin.auth().verifyIdToken(token).then((decodedToken) => {
            resolve(decodedToken.uid);
        }).catch((error) => {
            reject(new Error(error));
        });
    });
}

// "GET" method for a user 
function getUser(forumName, userID) {
    return firebase.db.database().ref(forumName).child('Users/' + userID).once('value');
}

function addPostData(forumName, p_user_id, p_title, p_tag_ids, p_content) {

    // Reference the company's firebase
    const firebaseRef = firebase.db.database().ref(forumName+"/Posts");

    var today = new Date();
    var date = (today.getMonth()+1)+'-'+today.getDate()+'-'+today.getFullYear()+' at '+today.getHours()+':'+today.getMinutes();

    // Push data inputted to firebase and also store reference of the push in "post_reference"
    try {
        var post_reference = firebaseRef.push({user_id: p_user_id,  
                                        title: p_title, 
                                        tag_ids: p_tag_ids, 
                                        date_time: date, 
                                        content: p_content, 
                                        karma: 0,
                                        responses: ["-1"], 
                                        follower_ids: ["-1"]});
    } catch(error) {
        console.log(error);
        return false;
    }

    try {
        notifyUsers(forumName, p_tag_ids);

    } catch(error) {
        console.log(error);
        return false;
    }

    return true;

}

var mailgun = require("mailgun-js");
require('dotenv').config();

const mg = mailgun({
    apiKey:	process.env.MAILGUN_API_KEY, 
	domain: 'mg.kiwis.tech', 
});

function sendEmail(email, subject, content) {
    console.log(email)
	const data = {
		"from": "KIWI Forum <no-reply@mg.kiwis.tech>",
		"to": email,
		"subject": subject ? subject : 'Hello',
		"text": content,
    }
	mg.messages().send(data, function(error, body){
        console.log(body);
        console.log(error);
	})
}

/* Assumptions: 
    - At least 1 user stored in the company's database
    - At least 1 tag in each user's profile
*/
function notifyUsers(companyName, posts_tags) {

        // If the post has no tags, then just return
        if(posts_tags == null || posts_tags.length == 0) {
            console.log("Post did not have tags");
            return;
        }

        const firebaseRef = firebase.db.database().ref(companyName);

        firebaseRef.once('value', function(snapshot){

            var users_array = Object.keys(snapshot.child("Users").val());
        
            // For each user in the company
            for(i = 0; i < users_array.length; i++) {
                var user_id = users_array[i];
                var user_email = (snapshot.child("Users/"+user_id+"/email").val());

                var curr_user_tags = (snapshot.child("Users/"+user_id+"/tags").val());

                // For each tag in this user's list
                for(j = 0; j < curr_user_tags.length; j++) {
                    var curr_tag = curr_user_tags[j];

                    // If this tag is in the post
                    if(posts_tags.indexOf(curr_tag, 0) != -1) {

                        var subject = "Relevant Post was created in "+companyName+"'s KIWI Forum";
                        var content = "A post tagged with at least one of your specialities in "+companyName+"'s KIWI Forum was created.";
                        console.log("SENT EMAIL TO "+ user_email);
                        sendEmail(user_email, subject, content);
                        break
                    }
                }
            }
        });
}

function userMadePost(companyName, user_id, post_id) {

    const firebaseRef = firebase.db.database().ref(companyName);
        
    firebaseRef.once('value', function(snapshot){

        // Assuming there's at least 1 post in the company's forum
        var posts_array = Object.keys(snapshot.child("Posts").val());

        for(i = 0; i < posts_array.length; i++) {
            var curr_post_id = posts_array[i];

            // Assuming the post_id is in the database
            if(curr_post_id == post_id) {

                var creator_of_post = (snapshot.child("Posts/"+curr_post_id+"/user_id").val());

                if(user_id == creator_of_post) {
                    return true;
                } else {
                    return false;
                }
            }
        }

    });
}

// "GET" method for users
function getUsers(forumName) {
    return firebase.db.database().ref(forumName).child('Users').once('value');
}

// Removes a user from the database
function removeUser(forumName, userID) {
    firebase.db.database().ref(forumName).child('Users').child(userID).remove();
}

function checkRegistration(id) {
    return firebase.db.database().ref('/Registrations/' + id).once('value');
}

module.exports = { 
	userMadePost, notifyUsers, sendEmail, createNewUser, getUser, getUsers, 
	removeUser, createNewTag, getTags, 
    getTagCount, removeTag, getCurrentUserID,
    getCompanyName, checkRegistration, addPostData};