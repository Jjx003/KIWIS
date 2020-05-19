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

function getCompanyName(user_id) {
    return firebase.db.database().ref('/UserCompaniesID/' + user_id).once('value');
}

function updateKarma(companyName, user_id, response_id) {

    return new Promise(function(resolve, reject){

        const firebaseRef = firebase.db.database().ref(companyName + '/Responses/' + response_id);

        var updates = {};
        firebaseRef.once('value', function(snapshot){

            var upvoters_array = (snapshot.child("upvoters").val());
        
            if(upvoters_array != null && upvoters_array.indexOf(user_id, 0) != -1) {
                reject(new Error("User already upvoted"))

            } else {

                if(upvoters_array == null) {
                    upvoters_array = [];
                }

                upvoters_array.push(user_id);
                updates["upvoters"] = upvoters_array;
                firebaseRef.update(updates);

                updates = {};
                firebaseRef.once('value', function(snapshot){
                    var karma = (snapshot.child("karma").val());
                    updates["karma"] = karma + 1;
                    firebaseRef.update(updates);

                    resolve(true)
    
                }) //.then(()=>{return canupvote}

                .catch( function(error) {
                    console.log(error);
                })

            }
    
        });
    })
}

function undoKarma(companyName, user_id, response_id) {

    return new Promise(function(resolve, reject){

        const firebaseRef = firebase.db.database().ref(companyName + '/Responses/' + response_id);

        var updates = {};
        firebaseRef.once('value', function(snapshot){

            var upvoters_array = (snapshot.child("upvoters").val());
        
            if(upvoters_array != null && upvoters_array.indexOf(user_id, 0) != -1) {
                reject(new Error("User already upvoted"))

            } else {

                if(upvoters_array == null) {
                    upvoters_array = [];
                }

                upvoters_array.push(user_id);
                updates["upvoters"] = upvoters_array;
                firebaseRef.update(updates);

                updates = {};
                firebaseRef.once('value', function(snapshot){
                    var karma = (snapshot.child("karma").val());
                    updates["karma"] = karma + 1;
                    firebaseRef.update(updates);

                    resolve(true)
    
                }) //.then(()=>{return canupvote}

                .catch( function(error) {
                    console.log(error);
                })

            }
    
        });
    })
}



module.exports = { undoKarma, updateKarma, getCompanyName,
	createNewUser, getUser, getUsers, 
	removeUser, createNewTag, getTags, 
    getTagCount, removeTag, getCurrentUserID};
    