var firebase = require('../firebase');
var db = require('../db');

//function adds random data to test table
function addTestData() {
    const firebaseRef = firebase.database().ref("test");
    firebaseRef.push({name:"al;sdfkj;lss", email: "jrcabrer@ucsd.edu"});
}


// add database functions below

// NOTE (Eric): in order to get userId: firebase.auth().currentUser.uid
// Also, forumDBRef requires the forumName so they can access the specific company

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
    db.database().ref(forumName).child('Tags').child(tagName).removeValue();
}

// Removes the tags from the users of a company
function removeTagFromAllUsers(forumName, tagName) {
    const forumDBRef = db.database().ref(forumName);
    forumDBRef.child('Users').once('value').then((data) => {
        var userIDs = data.val();
        for (userID in userIDs) {
            forumDBRef.child('Users').child(userID).child('Tags').child(tagName).removeValue();
        }
    });
}


// "POST" method for a new user
function createNewUser(forumName, firstName, lastName, email) {
    const forumDBRef = db.database().ref(forumName);
    var user = {};
    var userID = firebase.auth().currentUser.uid;

    // Creates a new user object with the userID as a key
    user[userID] = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        admin: false
    };
	forumDBRef.child("Users").push(user);
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
    db.database().ref(forumName).child('Users').child(userID).removeValue();
}
module.exports = { addTestData , createNewUser, getUser, getUsers, removeUser, createNewTag, getTags, getTagCount, removeTag, removeTagFromAllUsers};
