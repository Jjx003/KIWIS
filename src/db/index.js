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

// ERICS CODE
function getUser(forumName, userID) {
    return db.database().ref(forumName).child('Users/' + userID).once('value');
}

function getTags(forumName) {
    return db.database().ref(forumName).child('Tags').toJSON();
}


function addSpecalization(tagName) {
    db.auth().onAuthStateChanged(function(user) {
        if (user) {
          // User is signed in.
          var tag = db.database().ref(forumName).child("Tags/" + tagName);
          db.database().ref(forumName).child("Users/" + user).child("Tags").push(tag);
          tag.child("users").push(user);
        } else {
          // No user is signed in.
        }
    });
}

function removeSpecalization(tag) {
    db.auth().onAuthStateChanged(function(user) {
        if (user) {
          // User is signed in.
        } else {
          // No user is signed in.
        }
    });
}


export default {db, getUser, addSpecalization, removeSpecalization, getTags};


