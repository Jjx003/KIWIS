var firebase = require('../firebase');

function signUp(email, password, isAdmin) {
    return firebase.admin.auth().createUser({
	 	email: email,
		password: password,
		emailVerified: isAdmin
	 });
}

function checkToken(token) {
    return firebase.admin.auth().verifyIdToken(token);
}

module.exports = { signUp, checkToken };
