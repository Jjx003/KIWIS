var {db, admin} = require("../firebase")
var auth = require('../auth/index');

function getCompanyName(user_id) {
    return new Promise(function (resolve, reject) {
        db.database().ref('/UserCompaniesID/' + user_id).once('value').then((snapshot) => {
            resolve(snapshot.val());
        }).catch((error) => {
            reject(new Error(error));
        });
    });
}
// add database functions below

// NOTE (Eric): in order to get userId: firebase.auth().currentUser.uid
// Also, forumDBRef requires the forumName so they can access the specific company

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
function createNewUser(registration_ID, forumName, firstName, lastName, email, password, isAdmin) {
    //firebase.db.database().update(forumName);
    //firebase.db.database().ref(forumName).update(“Users”);
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
                console.log(userID, "is userID")
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
                console.log(userID, "is userID")
                forumDBRef.child('Users').update(user);
                //db.database().ref(`UserCompaniesID/${userID}`).set({forumName});
                var mapUserToCompany = {};
                mapUserToCompany[userID] = forumName;
                console.log(mapUserToCompany)
                db.database().ref("UserCompaniesID").update(mapUserToCompany);

                if(isAdmin == false) {
                    db.database().ref("Registrations").child(registration_ID).remove();
                }
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

    return true;

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

// "GET" method for users
function getUsers(forumName) {
    return db.database().ref(forumName).child('Users').once('value');
}

// Removes a user from the database
function removeUser(forumName, userID) {
    db.database().ref(forumName).child('Users').child(userID).remove();
}

function checkRegistration(id) {
    return db.database().ref('/Registrations/' + id).once('value');
}

function createRegistration(id, company, email) {
    return db.database().ref(`/Registrations/${id}`).set({expected_company:company, expected_email:email});
}

module.exports = { 
	createNewUser, getUser, getUsers, 
	removeUser, createNewTag, getTags, 
    getTagCount, removeTag, getCurrentUserID,
    endorseResponse, upVotePost, getCompanyName,
    checkRegistration, addPostData,
    getCompanyPosts, getCompanyTags,
    createRegistration
};
    
