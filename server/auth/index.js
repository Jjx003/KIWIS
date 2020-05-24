var firebase = require('../firebase');


function signUp(email, password) {
    return firebase.admin.auth().createUser({
	 	email: email,
		password: password,
		emailVerified: false
	 });
}

function checkToken(token) {
    return firebase.admin.auth().verifyIdToken(token);
}

module.exports = { signUp, checkToken };
