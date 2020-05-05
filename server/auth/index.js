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

module.exports = { login, signOut, signUp, createToken, checkToken };