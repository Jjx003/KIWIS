var firebase = require('../firebase');

function signUp(email, password) {
    return firebase.db.auth().createUserWithEmailAndPassword(email, password);
}

function checkToken(token) {
    return firebase.admin.auth().verifyIdToken(token);
}

module.exports = { signUp, checkToken };
