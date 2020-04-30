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

// POST method for new users
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

// GET method for users (NEED TO FIX or make better lol)
function getUser(forumName, userID) {
    const forumDBRef = db.database().ref(forumName);
    var user = {};
	forumDBRef.child('Users/' + userID).once('value', function(data) {
        data.forEach(function(item) {
            user[item.key] = item.val();
        });
    });
}

// POST method for new tags
function createNewTag(forumName, tagName) {
    const forumDBRef = db.database().ref(forumName);
    var tag = {};
    tag[tagName] = {count: 0}
    forumDBRef.child("Tags").set(tag);
}

// GET method for tags in forums (NEED TO FIX or make better lol)
function getTags(forumName) {
    const forumDBRef = db.database().ref(forumName);
    var tags = {};
	forumDBRef.child('Tags').once('value', function(data) {
        data.forEach(function(item) {
            tags[item.key] = item.val();
        });
    });
    return tags;
}

// GET method for a tag's number (NEED TO TEST)
function getTagCount(forumName, tagName) {
    const forumDBRef = db.database().ref(forumName);
    var count = -1;
	forumDBRef.child('Tags/' + tagName).once('value', function(data) {
        count = data['count'];
    });

    return count;
}

export default {db, createNewUser, getUser, createNewTag, getTags, getTagCount};
