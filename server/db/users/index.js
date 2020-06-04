var { db } = require('../../firebase');
var { admin } = require('../../firebase');
var auth = require('../auth/index');
var parent = require('../index');

function getUsers(forumName) {
    return parent.getUsers(forumName);
}

function getUser(forumName, userID) {
    return db.database().ref(forumName).child('Users/' + userID).once('value');
}

// Removes a user from the database
function removeUser(forumName, userID) {
    db.database().ref(forumName).child('Users').child(userID).remove();
    admin.auth().deleteUser(userID);
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

function removeSpecialization(forumName, userID, tagName) {
    db.database().ref(forumName).child('Users/').child(userID).child('tags').child(tagName).remove();
}

function addSpecialization(forumName, userID, tagName) {
    var tagtoadd = {};
    tagtoadd[tagName] = tagName;
    db.database().ref(forumName).child('Users/').child(userID).child('tags').update(tagtoadd);
}

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

function getCurrentUserID(token) {
    return parent.getCurrentUserID(token);
}

function getCompanyName(user_id) {
    return parent.getCompanyName(user_id);
}

function toggleAdmin(forumName, userID) {
    db.database().ref(forumName).child('Users/' + userID).child("admin").once('value').then((data) => {
        if (data.val()) {
            db.database().ref(forumName).child('Users/' + userID).update({ admin: false });
            admin.auth().updateUser(userID, { emailVerified: false });
        }
        else {
            db.database().ref(forumName).child('Users/' + userID).update({ admin: true });
            admin.auth().updateUser(userID, { emailVerified: true });
        }
    });
}

function getUserEmail(forumName, userID) {
    return db.database().ref(forumName).child('Users').child(userID).child('email').once('value');
}

function isUserAdmin(forumName, userID) {
    console.log(userID);
    return db.database().ref(forumName).child('Users').child(userID).child('admin').once('value');
}

module.exports = {getUsers, getUser, removeUser, removeAllUserTags, getUserTags, removeSpecialization,
                  addSpecialization, createNewUser, getCurrentUserID, getCompanyName, toggleAdmin,
                  getUserEmail, isUserAdmin}