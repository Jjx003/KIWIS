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

//erics user finder
//const userID = firebase.auth().currentUser.uid;
function getUser(forumName, userID) {
    return db.database().ref(forumName).child('Users/' + userID);
}

function getAllTags(forumName) {
  return db.database().ref(forumName).child('Tags').once('value');
}

function addSpecialization(forumName, tagName) {
  //db.database().ref(forumName).child('Tags').('test123').remove();
}

function removeSpecialization(forumName, /*userID,*/ tagName) {
  // const userTags = db.getUser(forumName, userID).child('Tags'); // do i put a once at the end?
  
  // userTags.child(tagName).removeValue();


  db.database().ref(forumName).child('Tags').child(tagName).remove();
  console.log("removed");

}


export default {db, getUser, addSpecialization, removeSpecialization, getAllTags};


