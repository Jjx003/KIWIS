import * as firebase from 'firebase';

const db = firebase.initializeApp({
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_DATABASE_URL,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_ID,
    measurementId: process.env.REACT_APP_MEASUREMENT_ID
});

// add database functions below

// NOTE (Eric): in order to get userId: firebase.auth().currentUser.uid
// Also, forumDBRef requires the forumName so they can access the specific company


var tags = {};

function updateGlobalTags(forumName, newTagsObject) {
    tags[forumName] = newTagsObject;
}

// Updates the tags variable when there's a new tag (HARD CODED bruh FOR NOW)
db.database().ref('bruh').child('Tags').on('value', function(snapshot) {
    updateGlobalTags('bruh', snapshot.val());
});

// Initialize the tag variable
function initializeTagData(forumName) {
    db.database().ref(forumName).child('Tags').once('value').then((initData)=> {
        updateGlobalTags(forumName, initData.val());
    });
}


// "POST" method for new tags
function createNewTag(forumName, tagName) {
    const forumDBRef = db.database().ref(forumName);
    var tag = {};
    tag[tagName] = {count: 0};
    forumDBRef.child("Tags").update(tag);
}

// "GET" method for tags in forums (NEED TO FIX or make better lol)
function getTags(forumName) {
    db.database().ref('bruh').child('Tags').once('value').then((initData)=> {
        updateGlobalTags('bruh', initData.val());
    });
    return tags[forumName];
}

// "GET" method for a tag's number (NEED TO TEST)
function getTagCount(forumName, tagName) {
    return tags[forumName][tagName];
}







var users = {};
// Updates the users variable when there's a new user (HARD CODED bruh FOR NOW)
db.database().ref('bruh').child('Users').once('value').then((initData)=> {
    updateGlobalUsers('bruh', initData.val());
});
db.database().ref('bruh').child('Users').on('value', function(snapshot) {
    updateGlobalUsers('bruh', snapshot.val());
});
function updateGlobalUsers(forumName, newUsersObject) {
    tags[forumName] = newUsersObject;
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

// "GET" method for users (NEED TO FIX or make better lol)
function getUser(forumName, userID) {
    return users[forumName][userID];
}

export default {db, createNewUser, getUser, createNewTag, getTags, getTagCount, initializeTagData};
