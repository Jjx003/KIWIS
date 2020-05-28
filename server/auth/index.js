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

function updateUserPassword(userID, newPassword) {
	return firebase.admin.auth().updateUser(userID, {password: newPassword});
}

module.exports = { updateUserPassword, signUp, checkToken };
