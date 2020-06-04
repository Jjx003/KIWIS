var { db } = require('../firebase');
var { admin } = require('../firebase');
var auth = require('../auth/index');

// Retrieve data from a specific company based off of the post_id
function pullResponse(company, post_id) {
    const responseRef = db.database().ref(company + '/Responses/');
    return responseRef.orderByChild("post_id").equalTo(post_id).once("value");
}

// "GET" method for users
function getUsers(forumName) {
    return db.database().ref(forumName).child('Users').once('value');
}


// "POST" method for a new user 
function createNewUser(registration_ID, forumName, firstName, lastName, email, password, isAdmin) {
    //firebase.db.database().update(forumName);
    //firebase.db.database().ref(forumName).update("Users");

    return new Promise(function (resolve, reject) {

        try {

            // Check if user is admin and if the company already exists
            var alreadyCreated = false;
            if (isAdmin == true) {
                db.database().ref(forumName).once("value", snapshot => {
                    if (snapshot.exists()) {
                        console.log("This company already exists");
                        alreadyCreated = true;
                        return;
                    }
                }).then((data) => {
                    if(alreadyCreated) {
                        resolve(false);
                        return;
                    }
                    const forumDBRef = db.database().ref(forumName);
                    auth.signUp(email, password, isAdmin).then((data) => {
                        var userID = data.uid;
                        var user = {};
                        // Creates a new user object with the userID as a key
                        user[userID] = {
                            firstName: firstName,
                            lastName: lastName,
                            email: email,
                            admin: isAdmin,
                            tags: { 'announcements': 'announcements', 'help-needed': 'help-needed' },
                            following_IDs: []
                        };
    
                        forumDBRef.child('Users').update(user);
                        var mapUserToCompany = {};
                        mapUserToCompany[userID] = forumName;
                        db.database().ref("UserCompaniesID").update(mapUserToCompany);
    
                        if (isAdmin == false) {
                            db.database().ref("Registrations").child(registration_ID).remove();
                        }
    
                        // Add the default 2 tags if it doesn't exist
                        forumDBRef.child('Tags').update({ "announcements": "announcements", "help-needed": "help-needed" });
    
                        resolve(true);
                    
                    }).catch((error) => {
                        console.log(error);
                        reject(new Error(error));
                    });
                })
            } else {
                const forumDBRef = db.database().ref(forumName);
                auth.signUp(email, password, isAdmin).then((data) => {
                    var userID = data.uid;
                    var user = {};
                    // Creates a new user object with the userID as a key
                    user[userID] = {
                        firstName: firstName,
                        lastName: lastName,
                        email: email,
                        admin: isAdmin,
                        tags: { 'announcements': 'announcements', 'help-needed': 'help-needed' },
                        following_IDs: []
                    };

                    forumDBRef.child('Users').update(user);
                    var mapUserToCompany = {};
                    mapUserToCompany[userID] = forumName;
                    db.database().ref("UserCompaniesID").update(mapUserToCompany);

                    if (isAdmin == false) {
                        db.database().ref("Registrations").child(registration_ID).remove();
                    }

                    // Add the default 2 tags if it doesn't exist
                    forumDBRef.child('Tags').update({ "announcements": "announcements", "help-needed": "help-needed" });

                    resolve(true);
                
                }).catch((error) => {
                    console.log(error);
                    reject(new Error(error));
                });
            }

        } catch (error) {
            console.log(error);
            reject(new Error(error));
        }
    })
}

// "GET" method for a user's id
function getCurrentUserID(token) {
    return new Promise(function (resolve, reject) {
        admin.auth().verifyIdToken(token).then((decodedToken) => {
            resolve(decodedToken.uid);
        }).catch((error) => {
            reject(new Error(error));
        });
    });
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
    return new Promise(function (resolve, reject) {
        db.database().ref('/Registrations/' + id).once('value').then((result) => {
            resolve(result);
        }).catch((error) => {
            reject(new Error(error));
        });
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

module.exports = {
    getCompanyName, createNewUser, getUsers,
    getCurrentUserID,pullResponse, checkRegistration,
    addFollowingUser, removeFollowingUser
};

