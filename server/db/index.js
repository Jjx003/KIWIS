var firebase = require('../firebase');

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
        var userIDs = data.val();
        for (userID in userIDs) {
            forumDBRef.child('Users').child(userID).child('Tags').child(tagName).remove();
        }
    });
}


// "POST" method for a new user 
function createNewUser(forumName, firstName, lastName, email) {
    const forumDBRef = firebase.db.database().ref(forumName);
    var user = {};

    // don't need userID for createNewUser because firebase generates one for us.
    // Creates a new user object with the userID as a key
    user = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        admin: false,
        tags: ['announcements', 'help-needed'],
        following_IDs: []
    };
	forumDBRef.child("Users").push(user);
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
module.exports = { createNewUser, getUser, getUsers, removeUser, createNewTag, getTags, getTagCount, removeTag};
