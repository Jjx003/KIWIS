var { db } = require('../firebase');
var { admin } = require('../firebase');
var auth = require('../auth/index');

// "POST" method for responses
function pushResponse(company, r_user_id, r_post_id, r_content) {

    // Company's ref 
    const firebaseRef = db.database().ref(company);

    //datetime month-date-year "at" time
    var today = new Date();
    var hours = today.getHours()
    var ampm = (today.getHours() >= 12 ? 'pm' : 'am');
    hours = (hours % 12);
    hours = hours ? hours : 12;
    var datetime = (today.getMonth() + 1) + '-' + today.getDate() + '-' + today.getFullYear()
                    + ' at '  + hours + ':'
                    + ((today.getMinutes() < 10)?"0":"") + today.getMinutes() + " " + ampm;
    try{
        firebaseRef.child("Responses").push({
        user_id: r_user_id,
        karma: 0,
        post_id: r_post_id,
        datetime: datetime,
        content: r_content,
        endorsed: false
        });
    } catch (error) {
        console.log(error);
        return false;
    }


    try {
        notifyUsersResponses(company, r_post_id);

    } catch (error) {
        console.log(error);
        return false;
    }

    return true;
}


// Retrieve data from a specific company based off of the post_id
function pullResponse(company, post_id) {
    const responseRef = db.database().ref(company + '/Responses/');
    return responseRef.orderByChild("post_id").equalTo(post_id).once("value");
}

// "POST" method for new tags
function createNewTag(forumName, tagName) {
    const forumDBRef = db.database().ref(forumName);
    var tag = {};
    tag[tagName] = { count: 0 };
    forumDBRef.child("Tags").update(tag);
}

// "GET" method for tags in forums 
function getTags(forumName) {
    return db.database().ref(forumName).child('Tags').once('value');
}
// add database functions below


// "GET" method for a tag's number 
function getTagCount(forumName, tagName) {
    return db.database().ref(forumName).child('Tags/' + tagName).once('value');
}

// Removes a tag from the company
function removeTag(forumName, tagName) {
    db.database().ref(forumName).child('Tags').child(tagName).remove();
    removeTagFromAllUsers(forumName, tagName);

}

// Removes the tags from the users of a company
function removeTagFromAllUsers(forumName, tagName) {
    const forumDBRef = db.database().ref(forumName);
    forumDBRef.child('Users').once('value').then((data) => {

        // Goes to every user
        data.forEach(function (child) {
            console.log(child.key)
            removeSpecialization(forumName, child.key, tagName);
        });
    });
}

function addSpecialization(forumName, userID, tagName) {
    var tagtoadd = {};
    tagtoadd[tagName] = tagName;
    db.database().ref(forumName).child('Users/').child(userID).child('tags').update(tagtoadd);
}

function removeSpecialization(forumName, userID, tagName) {
    db.database().ref(forumName).child('Users/').child(userID).child('tags').child(tagName).remove();
}

function isUserAdmin(forumName, userID) {
    return db.database().ref(forumName).child('Users').child(userID).child('admin').once('value');
}

// "GET" method for a user's id
function getCurrentUserID(token) {
    return new Promise(function (resolve, reject) {
        admin.auth().verifyIdToken(token).then((decodedToken) => {
            resolve(decodedToken.uid);
        }).catch((error) => {
            reject(new Error(error));
        });
    })
}

// "GET" method for a user 
function getUser(forumName, userID) {
    return db.database().ref(forumName).child('Users/' + userID).once('value');
}

// "GET" method for users
function getUsers(forumName) {
    return db.database().ref(forumName).child('Users').once('value');
}

// Removes a user from the database
function removeUser(forumName, userID) {
    db.database().ref(forumName).child('Users').child(userID).remove();
    admin.auth().deleteUser(userID);
}


function getCompanyPosts(company) {
    const firebaseRef = db.database().ref(company).child('Posts');
    return new Promise((resolve, reject) => {
        firebaseRef.once('value', postSnapShot => {
            let posts = [];
            postSnapShot.forEach(postId => {
                let post = postId.val();
                post.key = postId.key;
                post.visible = true;
                posts.unshift(post);
            })
            resolve(posts);
        })
    })
}

function getCompanyTags(company, tags) {
    return db.database().ref(company).child('Tags').once('value', tagSnapshot => {
        tagSnapshot.forEach(tag => {
            var x = tag.key;
            tags.push({ key: x, text: x, value: x });
        });
    });
}


// "POST" method for a new user 
function createNewUser(registration_ID, forumName, firstName, lastName, email, password, isAdmin) {
    //firebase.db.database().update(forumName);
    //firebase.db.database().ref(forumName).update("Users");

    return new Promise(function (resolve, reject) {

        try {
            // Check if user is admin and if the company already exists
            if (isAdmin == true) {
                db.database().ref(forumName).once("value", snapshot => {
                    if (snapshot.exists()) {
                        console.log("This company already exists");
                        resolve(false);
                        return;
                    }
                })
            }
            const forumDBRef = db.database().ref(forumName);
            auth.signUp(email, password, isAdmin).then((data) => {
                var userID = data.uid;
                var user = {};
                // Creates a new user object with the userID as a key
                user[userID] = {
                    firstName: firstName,
                    lastName: lastName,
                    email: email,
                    admin: isAdmin,
                    tags: { 'announcements': 'announcements', 'help-needed': 'help-needed' },
                    following_IDs: []
                };

                forumDBRef.child('Users').update(user);
                var mapUserToCompany = {};
                mapUserToCompany[userID] = forumName;
                db.database().ref("UserCompaniesID").update(mapUserToCompany);

                if (isAdmin == false) {
                    db.database().ref("Registrations").child(registration_ID).remove();
                }

                // Add the default 2 tags if it doesn't exist
                forumDBRef.child('Tags').update({ "announcements": "announcements", "help-needed": "help-needed" });

                resolve(true);
            }).catch((error) => {
                console.log(error);
                reject(new Error(error));
            });

        } catch (error) {
            console.log(error);
            reject(new Error(error));
        }
    })
}

// "GET" method for a user's id
function getCurrentUserID(token) {
    return new Promise(function (resolve, reject) {
        admin.auth().verifyIdToken(token).then((decodedToken) => {
            resolve(decodedToken.uid);
        }).catch((error) => {
            reject(new Error(error));
        });
    });
}

// "GET" method for a user 
function getUser(forumName, userID) {
    return db.database().ref(forumName).child('Users/' + userID).once('value');
}

function addPostData(forumName, p_user_id, p_title, p_tag_ids, p_content) {

    // Reference the company's firebase
    const firebaseRef = db.database().ref(forumName + "/Posts");

    //datetime month-date-year "at" time
    var today = new Date();
    var hours = today.getHours()
    var ampm = (today.getHours() >= 12 ? 'pm' : 'am');
    hours = (hours % 12);
    hours = hours ? hours : 12;
    var datetime = (today.getMonth() + 1) + '-' + today.getDate() + '-' + today.getFullYear()
                 + ' at '  + hours + ':'
                 + ((today.getMinutes() < 10)?"0":"") + today.getMinutes() + " " + ampm;

    // Push data inputted to firebase and also store reference of the push in "post_reference"
    try {
        var post_reference = firebaseRef.push({
            user_id: p_user_id,
            title: p_title,
            tag_ids: p_tag_ids,
            date_time: datetime,
            content: p_content,
            karma: 0,
            responses: ["-1"],
            follower_ids: []

        });

        var updates = {};
        updates[p_user_id] = p_user_id;
        db.database().ref(forumName + "/Posts/" + post_reference.key + "/follower_ids").update(updates);

    } catch (error) {
        console.log(error);
        return false;
    }

    try {
        notifyUsers(forumName, p_tag_ids);

    } catch (error) {
        console.log(error);
        return false;
    }

    return true;

}

var mailgun = require("mailgun-js");
require('dotenv').config();

const mg = mailgun({
    apiKey: process.env.MAILGUN_API_KEY,
    domain: 'mg.kiwis.tech',
});

function sendEmail(email, subject, content) {
    console.log(email)
    const data = {
        "from": "KIWI Forum <no-reply@mg.kiwis.tech>",
        "to": email,
        "subject": subject ? subject : 'Hello',
        "text": content,
    }
    mg.messages().send(data, function (error, body) {
        console.log(body);
        console.log(error);
    })
}

function notifyUsers(companyName, posts_tags) {

    // If the post has no tags, then just return
    if (posts_tags == null || posts_tags.length == 0) {
        console.log("Post did not have tags");
        return;
    }

    const firebaseRef = db.database().ref(companyName);

    firebaseRef.once('value', function (snapshot) {

        var users_array = Object.keys(snapshot.child("Users").val());

        // For each user in the company
        for (i = 0; i < users_array.length; i++) {
            var user_id = users_array[i];
            var user_email = (snapshot.child("Users/" + user_id + "/email").val());

            var curr_user_tags = (snapshot.child("Users/" + user_id + "/tags").val());

            // For each tag in this user's list
            for (j = 0; j < curr_user_tags.length; j++) {
                var curr_tag = curr_user_tags[j];

                // If this tag is in the post
                if (posts_tags.indexOf(curr_tag, 0) != -1) {

                    var subject = "Relevant Post was created in " + companyName + "'s KIWI Forum";
                    var content = "A post tagged with at least one of your specialities in " + companyName + "'s KIWI Forum was created.";
                    console.log("SENT EMAIL TO " + user_email);
                    sendEmail(user_email, subject, content);
                    break
                }
            }
        }
    });
}

// Notifies users how are following a post if a new response is made.
function notifyUsersResponses(companyName, post_id) {


    const firebaseRef = db.database().ref(companyName);
    firebaseRef.once('value', function(snapshot){

        var post_following = Object.keys(snapshot.child("Posts/" + post_id + "/follower_ids").val());
        // If the post has no users following, then just return
        if(post_following.length == 0) {
            console.log("Post did not have any users following");
            return;
        }

        var users_array = Object.keys(snapshot.child("Users").val());
        var post_id_title = snapshot.child("Posts/" + post_id +"/title").val();
    
        // For each user following the question.
        for(i = 0; i < post_following.length; i++) {
            var user_id = post_following[i];
            var user_email = (snapshot.child("Users/"+user_id+"/email").val());
            // Search for user in company user's
            for(j = 0; j < users_array.length; j++) {
                curr_user_id = users_array[j];
                // If this tag is in the post
                if(user_id == curr_user_id) {

                    var subject = "Relevant Response to Post: " + post_id_title +  " was created in "+ companyName +"'s KIWI Forum ";
                    var content = "A response to the post: " + post_id_title + " you were following was created in "
                                    + companyName + "'sKIWI Forum ";
                    console.log("SENT EMAIL TO "+ user_email);
                    sendEmail(user_email, subject, content);
                    break
                }
            }
        }
    });
}

function userMadePost(companyName, user_id, post_id) {

    return new Promise(function (resolve, reject) {

        const firebaseRef = db.database().ref(companyName);

        firebaseRef.once('value', function (snapshot) {

            // Assuming there's at least 1 post in the company's forum
            var posts_array = Object.keys(snapshot.child("Posts").val());

            for (i = 0; i < posts_array.length; i++) {
                var curr_post_id = posts_array[i];

                // Assuming the post_id is in the database
                if (curr_post_id == post_id) {

                    var creator_of_post = (snapshot.child("Posts/" + curr_post_id + "/user_id").val());

                    if (user_id == creator_of_post) {
                        resolve(true);
                        return;
                    } else {
                        resolve(false);
                        return;
                    }
                }
            }

        });
    })
}

// Upvoting response would look really similar
function upVotePost(forumName, post_id) {

    // Reference the post
    const firebaseRef = db.database().ref(forumName + "/Posts" + post_id);

    // Update the karma
    firebaseRef.update({ karma: karma + 1 });

}


// "GET" method for users
function getUsers(forumName) {
    return db.database().ref(forumName).child('Users').once('value');
}

function getCompanyName(user_id) {
    return new Promise(function (resolve, reject) {
        db.database().ref('/UserCompaniesID/' + user_id).once('value').then((snapshot) => {
            resolve(snapshot.val());
        }).catch((error) => {
            reject(new Error(error));
        });
    });
}

function checkRegistration(id) {
    return new Promise(function (resolve, reject) {
        db.database().ref('/Registrations/' + id).once('value').then((result) => {
            resolve(result);
        }).catch((error) => {
            reject(new Error(error));
        });
    });
}

function createRegistration(id, company, email) {
    return db.database().ref(`/Registrations/${id}`).set({ expected_company: company, expected_email: email });
}


function getUserEmail(forumName, userID) {
    return db.database().ref(forumName).child('Users').child(userID).child('email').once('value');
}

function removeAllUserTags(forumName, user_id) {
    const userTags = db.database().ref(forumName).child('Users/').child(user_id).child('tags');
    userTags.once('value').then((data) => {
        data.forEach(function (child) {
            userTags.child(child.key).remove();
        });
    });
}

function getUserTags(forumName, userID) {
    return db.database().ref(forumName).child('Users').child(userID).child('tags').once('value');
}

function toggleAdmin(forumName, userID) {
    db.database().ref(forumName).child('Users/' + userID).child("admin").once('value').then((data) => {
        if (data.val()) {
            db.database().ref(forumName).child('Users/' + userID).update({ admin: false });
            admin.auth().updateUser(userID, { emailVerified: false });
        }
        else {
            db.database().ref(forumName).child('Users/' + userID).update({ admin: true });
            admin.auth().updateUser(userID, { emailVerified: true });
        }
    });
}

function updateKarma(companyName, user_id, response_id) {

    return new Promise(function(resolve, reject){

        const firebaseRef = db.database().ref(companyName + '/Responses/' + response_id);

        var updates = {};
        firebaseRef.once('value', function(snapshot){

            var upvoters_array = (snapshot.child("upvoters").val());
        
            if(upvoters_array != null && upvoters_array.indexOf(user_id, 0) != -1) {
                reject(new Error("User already upvoted"))

            } else {

                if(upvoters_array == null) {
                    upvoters_array = [];
                }

                upvoters_array.push(user_id);
                updates["upvoters"] = upvoters_array;
                firebaseRef.update(updates);

                updates = {};
                firebaseRef.once('value', function(snapshot){
                    var karma = (snapshot.child("karma").val());
                    updates["karma"] = karma + 1;
                    firebaseRef.update(updates);

                    resolve(true)
    
                })

                .catch( function(error) {
                    console.log(error);
                })

            }
    
        });
    })
}

function undoUpvote(companyName, user_id, response_id) {

    return new Promise(function(resolve, reject){

        const firebaseRef = db.database().ref(companyName + '/Responses/' + response_id);
        console.log(firebaseRef);
        var updates = {};
        firebaseRef.once('value', function(snapshot){

            var upvoters_array = (snapshot.child("upvoters").val());
        
            if(upvoters_array == null || upvoters_array.indexOf(user_id, 0) == -1) {
                reject(new Error("User did not upvote"))

            } else {

                upvoter_index = upvoters_array.indexOf(user_id, 0);
                upvoters_array.splice(upvoter_index, 1);
                updates["upvoters"] = upvoters_array;
                firebaseRef.update(updates);

                updates = {};
                firebaseRef.once('value', function(snapshot){
                    var karma = (snapshot.child("karma").val());
                    updates["karma"] = karma - 1;
                    firebaseRef.update(updates);

                    resolve(true)
    
                })

                .catch( function(error) {
                    console.log(error);
                })

            }
    
        });
    })
}

// We want the user id of the person trying to endorse
/*
1. Check if user_id is the owner of the post of the response_id
    - If not, then return

2. Turn the response_id's endorse to true

Tests:
    - The user_id does not match the creator of the post
    - The user_id matches so endorse the post
    - The response is already endorsed
*/
function endorseResponse(companyName, user_id, response_id) {

    return new Promise(function(resolve, reject){

        const firebaseRef = db.database().ref(companyName);
        
        firebaseRef.once('value', function(snapshot){

            var post_idOfResponse = (snapshot.child("Responses/"+response_id+"/post_id").val());

            // Assuming there's at least 1 post in the company's forum
            var posts_array = Object.keys(snapshot.child("Posts").val());

            for(i = 0; i < posts_array.length; i++) {
                var curr_post_id = posts_array[i];

                // Assuming the post id of the reponse is in the post's table
                if(curr_post_id == post_idOfResponse) {

                    var creator_of_post = (snapshot.child("Posts/"+curr_post_id+"/user_id").val());

                    if(user_id == creator_of_post) {
                        break
                    } else {
                        reject(new Error("Only the creator of the post can endorse this response."))
                        return
                    }
                }
            }

            // If we made it down here then the user_id is valid so set endorse to true
            const responseRef = db.database().ref(companyName + '/Responses/' + response_id);
            updates = {};
            responseRef.once('value', function(snapshot){
                var endorsed = (snapshot.child("endorsed").val());

                if(endorsed == true) {
                    reject(new Error("This response is already endorsed."))
                    return
                }

                updates["endorsed"] = true;
                responseRef.update(updates);

                resolve(true)
    
            })

            .catch( function(error) {
                console.log(error);
            })

        })
    })
}

function undoEndorse(companyName, user_id, response_id) {

    return new Promise(function(resolve, reject){

        const firebaseRef = db.database().ref(companyName);
        
        firebaseRef.once('value', function(snapshot){

            var post_idOfResponse = (snapshot.child("Responses/"+response_id+"/post_id").val());

            // Assuming there's at least 1 post in the company's forum
            var posts_array = Object.keys(snapshot.child("Posts").val());

            for(i = 0; i < posts_array.length; i++) {
                var curr_post_id = posts_array[i];

                // Assuming the post id of the reponse is in the post's table
                if(curr_post_id == post_idOfResponse) {

                    var creator_of_post = (snapshot.child("Posts/"+curr_post_id+"/user_id").val());

                    if(user_id == creator_of_post) {
                        break
                    } else {
                        reject(new Error("Only the creator of the post can unendorse this response."))
                        return
                    }
                }
            }

            // If we made it down here then the user_id is valid so set endorse to false
            const responseRef = db.database().ref(companyName + '/Responses/' + response_id);
            updates = {};
            responseRef.once('value', function(snapshot){
                var endorsed = (snapshot.child("endorsed").val());

                if(endorsed == false) {
                    reject(new Error("This response is not endorsed."))
                    return
                }

                updates["endorsed"] = false;
                responseRef.update(updates);

                resolve(true)
    
            })

            .catch( function(error) {
                console.log(error);
            })

        })
    })
}

// Add a user to the post's following; user should no longer follow the post
function addFollowingUser(forumName, postID, userID) {
    var userIDObjectToBeAdded = {};
    userIDObjectToBeAdded[userID] = userID;
    var postIDObjectToBeAdded = {};
    postIDObjectToBeAdded[postID] = postID;
    db.database().ref(forumName).child("Posts/" + postID + "/follower_ids").update(userIDObjectToBeAdded);
    db.database().ref(forumName).child("Users/" + userID + "/following_IDs").update(postIDObjectToBeAdded);
}

// Remove a user to the post's following; user should no longer follow the post
function removeFollowingUser(forumName, postID, userID) {
    var userIDObjectToBeAdded = {};
    userIDObjectToBeAdded[userID] = userID;
    var postIDObjectToBeAdded = {};
    postIDObjectToBeAdded[postID] = postID;
    db.database().ref(forumName).child("Posts/" + postID + "/follower_ids/" + userID).remove();
    db.database().ref(forumName).child("Users/" + userID + "/following_IDs/" + postID).remove();
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

// Remove a user to the post's following; user should no longer follow the post
function isFollowingUser(forumName, postID, userID) {
    return db.database().ref(forumName).child("Posts/" + postID + "/follower_ids/" + userID).once("value");
}

function deletePostData(companyName, post_id) {

    const firebaseRef = db.database().ref(companyName);

    firebaseRef.once('value', function(snapshot){

        // Assuming there's at least 1 response in the company's forum
        var responses_array = Object.keys(snapshot.child("Responses").val());

        for(i = 0; i < responses_array.length; i++) {
            var curr_response_id = responses_array[i];

            if((snapshot.child("Responses/"+curr_response_id+"/post_id").val()) == post_id) {

                firebaseRef.child("Responses/"+curr_response_id).remove();

            }

        }

        // Assuming there's at least 1 user in the company's forum
        var user_array = Object.keys(snapshot.child("Users").val());

        for(i = 0; i < user_array.length; i++) {
            var curr_user_id = user_array[i];

            // I'm assuming "following_ids" is the name
            var curr_user_following = snapshot.child("Users/"+curr_user_id+"/following_ids").val();

            // If the current user is not following any posts or they are not following the post_id
            if(curr_user_following == null || curr_user_following.indexOf(post_id, 0) == -1) {
                continue;
            } else {

                var updates = {};
                post_id_index = curr_user_following.indexOf(post_id, 0);
                curr_user_following.splice(post_id_index, 1);
                updates["following_ids"] = curr_user_following;
                const followingRef = db.database().ref(companyName + '/Users/' + curr_user_id);
                followingRef.update(updates);

            }

        }

        firebaseRef.child("Posts/"+post_id).remove();
        return true;

    }) .catch( function(error) {
        console.log(error);
        return false;
    })
}

function deleteResponseData(companyName, response_id) {

    const firebaseRef = db.database().ref(companyName+"/Responses");

    try {
        firebaseRef.child(response_id).remove();

    } catch(error) {
        console.log(error);
        return false;
    }

    return true;
        
}


function getUpvoteArray(responses, userID) {
    return new Promise( (resolve, reject) => {
        var values = responses.val();
        if (responses.val() == null) {
            resolve(values);
        }
        var returnVal = {};
        for( var key in values) {
            returnVal[key] = false;
            if(values[key].upvoters != undefined) {
                for(var i = 0; i < values[key].upvoters.length; i++) {
                    if (values[key].upvoters[i] == userID) {
                        returnVal[key] = true;
                        break;
                    }
                }
            }
        }
        resolve(returnVal);
    })
}

module.exports = {
    undoEndorse, updateKarma, undoUpvote, deletePostData, deleteResponseData,
    notifyUsers, getCompanyName, userMadePost, createNewUser, getUser, getUsers,
    createNewTag, getTags, notifyUsersResponses,
    getTagCount, removeTag, getCurrentUserID,
    getUserTags, removeSpecialization,
    addSpecialization, removeAllUserTags, toggleAdmin,
    getCompanyPosts, getCompanyTags, getUserEmail,
    isUserAdmin, pullResponse, pushResponse, checkRegistration,
    getMetadata, createRegistration, upVotePost, addPostData, removeUser, endorseResponse,
    addFollowingUser, removeFollowingUser, getUpvoteArray, isFollowingUser,
    undoEndorse, updateKarma, undoUpvote, deletePostData, deleteResponseData
};

