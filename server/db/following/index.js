var { db } = require('../../firebase');
var { admin } = require('../../firebase');
var parent = require('../index');

function getCurrentUserID(token) {
    return parent.getCurrentUserID(token);
}

function getCompanyName(user_id) {
    return parent.getCompanyName(user_id);
}

function addFollowingUser(forumName, postID, userID) {
    parent.addFollowingUser(forumName, postID, userID);
}

function removeFollowingUser(forumName, postID, userID) {
    parent.removeFollowingUser(forumName, postID, userID);
}
module.exports = { getCurrentUserID, getCompanyName, addFollowingUser, removeFollowingUser }