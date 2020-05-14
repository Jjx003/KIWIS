var firebase = require('../firebase');

function login(email, password) {
    return firebase.db.auth().signInWithEmailAndPassword(email, password);
}

function signOut() {
    return firebase.db.auth().signOut();
}

function signUp(email, password) {
    return firebase.db.auth().createUserWithEmailAndPassword(email, password);
}

function createToken(uid) {
    return firebase.admin.auth().createCustomToken(uid);
}

function checkToken(token) {
    return firebase.db.auth().signInWithCustomToken(token);
}

function getUserID() {

    var user = firebase.db.auth().currentUser;

    try {
        return user.uid;
    } catch(error) {
        console.log("user is null");
        return null;
    }

}

function getCompanyName(user_id) {
    return firebase.db.database().ref('/UserCompaniesID/' + user_id).once('value');
}

module.exports = { login, signOut, signUp, createToken, checkToken, getUserID, getCompanyName };