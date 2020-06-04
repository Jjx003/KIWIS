var parent = require('../common_models');

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