var { db } = require('../../firebase');
var { admin } = require('../../firebase');
var parent = require('../common_models');

// "GET" method for a user's id
function getCurrentUserID(token) {
    return parent.getCurrentUserID(token);
}

function getCompanyName(user_id) {
    return parent.getCompanyName(user_id);
}

// Gets metadata for user activity and tag popularity
// Returns: Count of Tags used in Posts, Count of Posts/Responses per User
function getMetadata(forumName) {
    return new Promise(function (resolve, reject) {
        var metaData = { 'tagCount': {}, 'userCount': {}, 'userIDCount': {} };
        db.database().ref(forumName).child('Posts').once('value').then((data) => {

            // For each post
            Object.keys(data.val()).forEach(postID => {

                // For each post's tags
                if (data.val()[postID]['tag_ids'] != null) {
                    Object.keys(data.val()[postID]['tag_ids']).forEach(tagIndex => {
                        var tagName = data.val()[postID]['tag_ids'][tagIndex];

                        if (tagName in metaData['tagCount']) {
                            metaData['tagCount'][tagName] += 1;
                        } else {
                            console.log('Tag ' + '\"' + tagName + '\"' + " not counted, currently adding to metadata");
                            metaData['tagCount'][tagName] = 1;
                        }
                    });
                }

                // For each post's owner
                var userID = data.val()[postID]['user_id'];
                if (userID in metaData['userIDCount']) {
                    metaData['userIDCount'][userID] += 1;
                } else {
                    console.log('UserID ' + '\"' + userID + '\"' + " not counted, currently adding to metadata");
                    metaData['userIDCount'][userID] = 1;
                }
                getUsers(forumName).then(data => {
                    Object.keys(metaData['userIDCount']).forEach(userID => {
                        if (data.val()[userID] != null) {
                            var userFullName = data.val()[userID]['firstName'] + " " + data.val()[userID]['lastName'];
                            metaData['userCount'][userFullName] = metaData['userIDCount'][userID];
                        }
                    });
                    resolve(metaData);
                });

            })
        }).catch(err => {
            reject(err);
        });
    })
}

// "GET" method for users
function getUsers(forumName) {
    return parent.getUsers(forumName);
}

module.exports = { getCurrentUserID, getCompanyName, getMetadata, getUsers};