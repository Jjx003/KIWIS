var firebase = require('firebase');
require('dotenv').config();

const db = firebase.initializeApp({
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.AUTH_DOMAIN,
    databaseURL: process.env.DATABASE_URL,
    projectId: process.env.PROJECT_ID,
    storageBucket: process.env.STORAGE_BUCKET,
    messagingSenderId: process.env.MESSAGING_SENDER_ID,
    appId: process.env.ID,
    measurementId: process.env.MEASUREMENT_ID
});

// add database functions below

//function adds random data to test table
function addTestData() {
    const firebaseRef = db.database().ref("test");
    firebaseRef.push({name:"al;sdfkj;lss", email: "jrcabrer@ucsd.edu"});
}

function login(email, password) {
    return db.auth().signInWithEmailAndPassword(email, password);
}

function signOut() {
    return db.auth().signOut();
}

function signUp(email, password) {
    return db.auth().createUserWithEmailAndPassword(email, password);
}

module.exports = {login, signOut, signUp, addTestData};
