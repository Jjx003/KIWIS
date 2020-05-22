var firebase = require('../firebase');
var auth = require('../auth/index');

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
            console.log(child.key)
            removeSpecialization(forumName, child.key, tagName);


            // child.forEach(function (grandchild) {

            //     // goes to the tags object in the user
            //     if(grandchild.key === 'tags') {
            //         console.log(grandchild.key + " : " + grandchild.val());

            //         // Checks every tag and removes the one that doesn't matter
            //         grandchild.forEach(function (tagNameChild) {

            //             //Checks which tag to remove
            //             if(tagNameChild.val() === tagName) {
            //                 forumDBRef.child('Users/' + child.key).child('tags/' + tagNameChild.key).remove()
            //             }
            //         });
            //     }
            // });
        });
    });
}

function getUserTags(forumName, userID) {
    return firebase.db.database().ref(forumName).child('Users').child(userID).child('tags').once('value');
}


function addSpecialization(forumName, userID, tagName) {
    var tagtoadd = {};
    tagtoadd[tagName] = tagName;
    firebase.db.database().ref(forumName).child('Users/').child(userID).child('tags').update(tagtoadd);
}


function removeSpecialization(forumName, userID, tagName) {
    firebase.db.database().ref(forumName).child('Users/').child(userID).child('tags').child(tagName).remove();
}

  
// "POST" method for a new user 
function createNewUser(registration_ID, forumName, firstName, lastName, email, password, isAdmin) {
    //firebase.db.database().update(forumName);
    //firebase.db.database().ref(forumName).update("Users");

    return new Promise(function(resolve, reject){

        try {

            // Check if user is admin and if the company already exists
            if(isAdmin == true) {
                firebase.db.database().ref(forumName).once("value", snapshot => {
                    if(snapshot.exists()) {
                        console.log("This company already exists");
                        resolve(false);
                        return;
                    }
                })
            }

            const forumDBRef = firebase.db.database().ref(forumName);
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
                forumDBRef.child("Users").update(user);

                var mapUserToCompany = {};
                mapUserToCompany[userID] = forumName;
                firebase.db.database().ref("UserCompaniesID").update(mapUserToCompany);

                if(isAdmin == false) {

                    firebase.db.database().ref("Registrations").child(registration_ID).remove();

                }

                resolve(true);
            });
            
        } catch(error) {
            console.log(error);
            reject(new Error(error));
        }
    })

}

// "GET" method for a user's id
function getCurrentUserID(idToken) {
	return firebase.admin.auth().verifyIdToken(idToken);
}

// "GET" method for a user 
function getUser(forumName, userID) {
    return firebase.db.database().ref(forumName).child('Users/' + userID).once('value');
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

function createForum(forumName, user_id) {
    const forumDBRef = firebase.db.database().ref(forumName+"/Users");
}

function getCompanyName(user_id) {
    return firebase.db.database().ref('/UserCompaniesID/' + user_id).once('value');
}

function getCurrentUserID(token) {
	return firebase.admin.auth().verifyIdToken(token);
}

function removeAllUserTags(forumName, user_id) {
    const userTags = firebase.db.database().ref(forumName).child('Users/').child(user_id).child('tags');
    userTags.once('value').then((data) => { 
         data.forEach(function (child) {
            userTags.child(child.key).remove();
         })
    });
}


function toggleAdmin(forumName, userID){
    firebase.db.database().ref(forumName).child('Users/' + userID).child("admin").once('value').then( (data) => {
        if(data.val()){
            firebase.db.database().ref(forumName).child('Users/' + userID).update({admin: false});
            firebase.db.admin.auth.updateUser(userID, {emailVerfied: false});
        }
        else{
            firebase.db.database().ref(forumName).child('Users/' + userID).update({admin: true});
            firebase.db.admin.auth.updateUser(userID, {emailVerfied: true});
        }
    });
}

module.exports = { 
    createForum, getCompanyName, getCurrentUserID,
	createNewUser, getUser, getUsers, 
	removeUser, createNewTag, getTags, 
    getTagCount, removeTag, getCurrentUserID,
    checkRegistration, getUserTags, removeSpecialization,
    addSpecialization, removeAllUserTags, toggleAdmin
};