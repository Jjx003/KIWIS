var {db} = require('../firebase');
var {admin} = require('../firebase');
var auth = require('../auth/index');

// "POST" method for responses
function pushResponse(company,r_user_id, r_post_id, r_content){
    
    // Company's ref 
    const firebaseRef = db.database().ref(company);

    //datetime month-date-year "at" time
    var today = new Date();
    var datetime = (today.getMonth()+1)+'-'+today.getDate()+'-'+today.getFullYear()+' at '+today.getHours()+':'+today.getMinutes();
    
    firebaseRef.child("Responses").push({
        user_id: r_user_id,
        karma: 0,
        post_id: r_post_id,
        datetime: datetime,
        content: r_content,
        endorsed: false});
    
}


// Retrieve data from a specific company based off of the post_id
function pullResponse(company, post_id){
    const responseRef = db.database().ref(company+ '/Responses/');
    return responseRef.orderByChild("post_id").equalTo(post_id).once("value");
}

// "POST" method for new tags
function createNewTag(forumName, tagName) {
    const forumDBRef = db.database().ref(forumName);
    var tag = {};
    tag[tagName] = {count: 0};
    forumDBRef.child("Tags").update(tag);
}

// "GET" method for tags in forums 
function getTags(forumName) {
    return db.database().ref(forumName).child('Tags').once('value');
}
// add database functions below


// "GET" method for a tag's number 
function getTagCount(forumName, tagName) {
    return db.database().ref(forumName).child('Tags/' + tagName).once('value');
}

// Removes a tag from the company
function removeTag(forumName, tagName) {
    db.database().ref(forumName).child('Tags').child(tagName).remove();
    removeTagFromAllUsers(forumName, tagName);

}

// Removes the tags from the users of a company
function removeTagFromAllUsers(forumName, tagName) {
    const forumDBRef = db.database().ref(forumName);
    forumDBRef.child('Users').once('value').then((data) => {

        // Goes to every user
        data.forEach(function (child) {
            console.log(child.key)
            removeSpecialization(forumName, child.key, tagName);
        });
    });
}	

function addSpecialization(forumName, userID, tagName) {
    var tagtoadd = {};
    tagtoadd[tagName] = tagName;
    db.database().ref(forumName).child('Users/').child(userID).child('tags').update(tagtoadd);
}

function removeSpecialization(forumName, userID, tagName) {
    db.database().ref(forumName).child('Users/').child(userID).child('tags').child(tagName).remove();
}

function isUserAdmin(forumName, userID) {
    return db.database().ref(forumName).child('Users').child(userID).child('admin').once('value');
}

// "GET" method for a user's id
function getCurrentUserID(token) {
    return new Promise(function(resolve, reject) {
        admin.auth().verifyIdToken(token).then((decodedToken) => {
            resolve(decodedToken.uid);
        }).catch((error) => {
            reject(new Error(error));
        });
    })
}

// "GET" method for a user 
function getUser(forumName, userID) {
    return db.database().ref(forumName).child('Users/' + userID).once('value');
}

// "GET" method for users
function getUsers(forumName) {
    return db.database().ref(forumName).child('Users').once('value');
}

// Removes a user from the database
function removeUser(forumName, userID) {
    db.database().ref(forumName).child('Users').child(userID).remove();
    admin.auth().deleteUser(userID);
}

    
function getCompanyPosts(company){
    const firebaseRef = db.database().ref(company).child('Posts');
    return new Promise((resolve, reject) => {
        firebaseRef.once('value', postSnapShot => {
            let posts = [];
            postSnapShot.forEach(postId => {
                let post = postId.val();
                post.key = postId.key;
                post.visible = true;
                posts.unshift(post);
            })
            resolve(posts);
        })
    })
}

function getCompanyTags(company, tags){
    return db.database().ref(company).child('Tags').once('value', tagSnapshot => {
        tagSnapshot.forEach(tag => {
            var x = tag.key;
            tags.push({ key: x, text: x, value: x });
        });
    });
}


// "POST" method for a new user 
function createNewUser(registration_ID, forumName, firstName, lastName, email, password, isAdmin) {
    //firebase.db.database().update(forumName);
    //firebase.db.database().ref(forumName).update("Users");

    return new Promise(function(resolve, reject){

        try {
            // Check if user is admin and if the company already exists
            if(isAdmin == true) {
                db.database().ref(forumName).once("value", snapshot => {
                    if(snapshot.exists()) {
                        console.log("This company already exists");
                        resolve(false);
                        return;
                    }
                })
            }
            const forumDBRef = db.database().ref(forumName);
            auth.signUp(email, password, isAdmin).then((data) => {
                var userID = data.uid;
                var user = {};
                // Creates a new user object with the userID as a key
                user[userID] =  {
                    firstName: firstName,
                    lastName: lastName,
                    email: email,
                    admin: isAdmin,
                    tags: {'announcements':'announcements', 'help-needed':'help-needed'},
                    following_IDs: []
                };
                
                forumDBRef.child('Users').update(user);
                var mapUserToCompany = {};
                mapUserToCompany[userID] = forumName;
                db.database().ref("UserCompaniesID").update(mapUserToCompany);

                if(isAdmin == false) {
                    db.database().ref("Registrations").child(registration_ID).remove();
                }

                // Add the default 2 tags if it doesn't exist
                forumDBRef.child('Tags').update({"annoucements":"annoucements", "help-needed":"help-needed"});

                resolve(true);
            }).catch((error) =>{ 
                console.log(error);
                reject(new Error(error));
            });

        } catch(error) {
            console.log(error);
            reject(new Error(error));
        }
    })
}

// "GET" method for a user's id
function getCurrentUserID(token) {
    return new Promise(function(resolve, reject) {
        admin.auth().verifyIdToken(token).then((decodedToken) => {
            resolve(decodedToken.uid);
        }).catch((error) => {
            reject(new Error(error));
        });
    });
}

// "GET" method for a user 
function getUser(forumName, userID) {
    return db.database().ref(forumName).child('Users/' + userID).once('value');
}

function addPostData(forumName, p_user_id, p_title, p_tag_ids, p_content) {

    // Reference the company's firebase
    const firebaseRef = db.database().ref(forumName+"/Posts");

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

function notifyUsers(companyName, posts_tags) {

        // If the post has no tags, then just return
        if(posts_tags == null || posts_tags.length == 0) {
            console.log("Post did not have tags");
            return;
        }

        const firebaseRef = db.database().ref(companyName);

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

    return new Promise(function(resolve, reject){

        const firebaseRef = db.database().ref(companyName);
        
        firebaseRef.once('value', function(snapshot){

            // Assuming there's at least 1 post in the company's forum
            var posts_array = Object.keys(snapshot.child("Posts").val());

            for(i = 0; i < posts_array.length; i++) {
                var curr_post_id = posts_array[i];

                // Assuming the post_id is in the database
                if(curr_post_id == post_id) {

                    var creator_of_post = (snapshot.child("Posts/"+curr_post_id+"/user_id").val());

                    if(user_id == creator_of_post) {
                        resolve(true);
                        return;
                    } else {
                        resolve(false);
                        return;
                    }
                }
            }

        });
    })
}

// Upvoting response would look really similar
function upVotePost(forumName, post_id) {

    // Reference the post
    const firebaseRef = db.database().ref(forumName+"/Posts"+post_id);

    // Update the karma
    firebaseRef.update({karma: karma+1});

}

function endorseResponse(forumName, response_id) {

    // Reference the response
    const firebaseRef = db.database().ref(forumName+"/Responses"+response_id);

    // Endorse the response
    firebaseRef.update({endorsed: true});

}

// Removes a user from the database
function removeUser(forumName, userID) {
    db.database().ref(forumName).child('Users').child(userID).remove();
}

// "GET" method for users
function getUsers(forumName) {
    return db.database().ref(forumName).child('Users').once('value');
}

function getCompanyName(user_id) {
    return new Promise(function (resolve, reject) {
        db.database().ref('/UserCompaniesID/' + user_id).once('value').then((snapshot) => {
            resolve(snapshot.val());
        }).catch((error) => {
            reject(new Error(error));
        });
    });
}

function checkRegistration(id) {
    return new Promise (function (resolve, reject) {
        db.database().ref('/Registrations/' + id).once('value').then((result) => {
            resolve(result);
        }).catch((error) => {
            reject(new Error(error));
        });
    });
}

function createRegistration(id, company, email) {
    return db.database().ref(`/Registrations/${id}`).set({expected_company:company, expected_email:email});
}


function getUserEmail(forumName, userID) {
    return db.database().ref(forumName).child('Users').child(userID).child('email').once('value');
}

function removeAllUserTags(forumName, user_id) {
    const userTags = db.database().ref(forumName).child('Users/').child(user_id).child('tags');
    userTags.once('value').then((data) => {
         data.forEach(function (child) {
            userTags.child(child.key).remove();
         });
    });
}

function getUserTags(forumName, userID) {
    return db.database().ref(forumName).child('Users').child(userID).child('tags').once('value');
}

function toggleAdmin(forumName, userID){
    db.database().ref(forumName).child('Users/' + userID).child("admin").once('value').then( (data) => {
        if(data.val()){
            db.database().ref(forumName).child('Users/' + userID).update({admin: false});
            admin.auth().updateUser(userID, {emailVerified: false});
        }
        else{
            db.database().ref(forumName).child('Users/' + userID).update({admin: true});
            admin.auth().updateUser(userID, {emailVerified: true});
        }
    });
}

// Add a user to the post's following; user should no longer follow the post
function addFollowingUser(forumName, postID, userID) {
    var userIDObjectToBeAdded = {};
    userIDObjectToBeAdded[userID] = userID;
    var postIDObjectToBeAdded = {};
    postIDObjectToBeAdded[postID] = postID;
    db.database().ref(forumName).child("Posts/" + postID + "/follower_ids").update(userIDObjectToBeAdded);
    db.database().ref(forumName).child("Users/" + userID + "/following_IDs").update(postIDObjectToBeAdded);
}

// Remove a user to the post's following; user should no longer follow the post
function removeFollowingUser(forumName, postID, userID) {
    var userIDObjectToBeAdded = {};
    userIDObjectToBeAdded[userID] = userID;
    var postIDObjectToBeAdded = {};
    postIDObjectToBeAdded[postID] = postID;
    db.database().ref(forumName).child("Posts/" + postID + "/follower_ids/" + userID).remove();
    db.database().ref(forumName).child("Users/" + userID + "/following_IDs/" + postID).remove();
}


// Gets metadata for user activity and tag popularity
// Returns: Count of Tags used in Posts, Count of Posts/Responses per User
function getMetadata(forumName) {
    return new Promise(function(resolve, reject) {
        var metaData = {'tagCount': {}, 'userCount': {}, 'userIDCount': {}};
        db.database().ref(forumName).child('Posts').once('value').then( (data) => {

            // For each post
            Object.keys(data.val()).forEach(postID => {
    
                // For each post's tags
                if(data.val()[postID]['tag_ids'] != null) {
                    Object.keys(data.val()[postID]['tag_ids']).forEach(tagIndex => {
                        var tagName = data.val()[postID]['tag_ids'][tagIndex];
                        
                        if (tagName in metaData['tagCount']) {
                            metaData['tagCount'][tagName] += 1;
                        } else {
                            console.log('Tag ' + '\"' + tagName + '\"' + " not counted, currently adding to metadata");
                            metaData['tagCount'][tagName] = 1;
                        }
                    });
                }
    
                // For each post's owner
                var userID = data.val()[postID]['user_id'];
                if(userID in metaData['userIDCount']) {
                    metaData['userIDCount'][userID] += 1;
                } else {
                    console.log('UserID ' + '\"' + userID + '\"' + " not counted, currently adding to metadata");
                    metaData['userIDCount'][userID] = 1;
                }
                getUsers(forumName).then(data => {
                    Object.keys(metaData['userIDCount']).forEach(userID => {
                        if(data.val()[userID] != null) {
                            var userFullName = data.val()[userID]['firstName'] + " " + data.val()[userID]['lastName'];
                            metaData['userCount'][userFullName] = metaData['userIDCount'][userID];
                        }
                    });
                    resolve(metaData);
                });
    
            })
        }).catch(err => {
            reject(err);
        });
    })
}


module.exports = { 
    notifyUsers, getCompanyName, userMadePost, createNewUser, getUser, getUsers, 
	  removeUser, createNewTag, getTags, 
    getTagCount, removeTag, getCurrentUserID,
    getUserTags, removeSpecialization,
    addSpecialization, removeAllUserTags, toggleAdmin,
    getCompanyPosts, getCompanyTags, getUserEmail,
    isUserAdmin, pullResponse, pushResponse, checkRegistration,
    getMetadata, createRegistration, upVotePost, addPostData, removeUser, endorseResponse,
    addFollowingUser, removeFollowingUser
};

