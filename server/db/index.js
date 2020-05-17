var firebase = require('../firebase');

//function adds random data to test table
function addTestData() {
    const firebaseRef = firebase.database().ref("test");
    firebaseRef.push({name:"al;sdfkj;lss", email: "jrcabrer@ucsd.edu"});
}

function getTags(forumName) {
    return firebase.db.database().ref(forumName).child('Tags').once('value');
}

function getUserTags(forumName, userID) {
    return firebase.db.database().ref(forumName).child('Users').child(userID).child('tags').once('value');
}

function removeSpecialization(forumName, userID, tagName) {
    const userTags = firebase.db.getUser(forumName, userID).child('Tags');
    userTags.child(tagName).removeValue();  
}
  

module.exports = { addTestData, removeSpecialization, getTags, getUserTags };
