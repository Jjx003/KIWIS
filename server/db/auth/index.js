var { db } = require('../../firebase');
var { admin } = require('../../firebase');
var auth = require('../../auth/index');
var parent = require('../index');

// "GET" method for a user's id
function getCurrentUserID(token) {
    return parent.getCurrentUserID(token);
}

function getCompanyName(user_id) {
    return parent.getCompanyName(user_id);
}

// "POST" method for a new user 
function createNewUser(registration_ID, forumName, firstName, lastName, email, password, isAdmin) {
    return parent.createNewUser(registration_ID, forumName, firstName, lastName, email, password, isAdmin);
}

function checkRegistration(id) {
    return parent.checkRegistration(id);
}

module.exports = { getCurrentUserID, getCompanyName, createNewUser, checkRegistration };