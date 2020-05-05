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
    return firebase.db.auth().currentUser.getIdToken(uid);
}

function checkToken(token) {
    return firebase.admin.auth().verifyIdToken(token);
}

module.exports = { login, signOut, signUp, createToken, checkToken };