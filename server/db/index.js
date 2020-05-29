var firebase = require('../firebase');
var auth = require('../auth/index');

// add database functions below

// NOTE (Eric): in order to get userId: firebase.auth().currentUser.uid
// Also, forumDBRef requires the forumName so they can access the specific company

// "POST" method for new tags
function createNewTag(forumName, tagName) {
    const forumDBRef = firebase.db.database().ref(forumName);
    var tag = {};
    tag[tagName] = {count: 0};
    forumDBRef.child("Tags").update(tag);
}

// "GET" method for tags in forums 
function getTags(forumName) {
    return firebase.db.database().ref(forumName).child('Tags').once('value');
}

// "GET" method for a tag's number 
function getTagCount(forumName, tagName) {
    return firebase.db.database().ref(forumName).child('Tags/' + tagName).once('value');
}

// Removes a tag from the company
function removeTag(forumName, tagName) {
    firebase.db.database().ref(forumName).child('Tags').child(tagName).remove();
    removeTagFromAllUsers(forumName, tagName);

}

// Removes the tags from the users of a company
function removeTagFromAllUsers(forumName, tagName) {
    const forumDBRef = firebase.db.database().ref(forumName);
    forumDBRef.child('Users').once('value').then((data) => {

        // Goes to every user
        data.forEach(function (child) {
            child.forEach(function (grandchild) {

                // goes to the tags object in the user
                if(grandchild.key === 'tags') {
                    console.log(grandchild.key + " : " + grandchild.val());

                    // Checks every tag and removes the one that doesn't matter
                    grandchild.forEach(function (tagNameChild) {

                        //Checks which tag to remove
                        if(tagNameChild.val() === tagName) {
                            forumDBRef.child('Users/' + child.key).child('tags/' + tagNameChild.key).remove()
                        }
                    });
                }
            });
        });
    });
}	

// "POST" method for a new user 
function createNewUser(forumName, firstName, lastName, email, password) {
    const forumDBRef = firebase.db.database().ref(forumName);
    auth.signUp(email, password).then((data) => {
        var userID = data.user.uid
        var user = {};

        // Creates a new user object with the userID as a key
        user[userID] =  {
            firstName: firstName,
            lastName: lastName,
            email: email,
            admin: false,
            tags: ['announcements', 'help-needed'],
            following_IDs: []
        };
        forumDBRef.child("Users").update(user);

        var mapUserToCompany = {};
        mapUserToCompany[userID] = forumName;
        firebase.db.database().ref("UserCompaniesID").update(mapUserToCompany);
    });
}

// "GET" method for a user's id
function getCurrentUserID(token) {
	return firebase.admin.auth().verifyIdToken(idToken);
}

// "GET" method for a user 
function getUser(forumName, userID) {
    return firebase.db.database().ref(forumName).child('Users/' + userID).once('value');
}

// "GET" method for users
function getUsers(forumName) {
    return firebase.db.database().ref(forumName).child('Users').once('value');
}

// Removes a user from the database
function removeUser(forumName, userID) {
    firebase.db.database().ref(forumName).child('Users').child(userID).remove();
}

function getCompanyName(user_id) {
    return firebase.db.database().ref('/UserCompaniesID/' + user_id).once('value');
}

function updateKarma(companyName, user_id, response_id) {

    return new Promise(function(resolve, reject){

        const firebaseRef = firebase.db.database().ref(companyName + '/Responses/' + response_id);

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

        const firebaseRef = firebase.db.database().ref(companyName + '/Responses/' + response_id);
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

        const firebaseRef = firebase.db.database().ref(companyName);
        
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
            const responseRef = firebase.db.database().ref(companyName + '/Responses/' + response_id);
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
    
        });
    })
}

function deletePostData(companyName, post_id) {

    const firebaseRef = firebase.db.database().ref(companyName);

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
                const followingRef = firebase.db.database().ref(companyName + '/Users/' + curr_user_id);
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

    const firebaseRef = firebase.db.database().ref(companyName+"/Responses");

    try {
        firebaseRef.child(response_id).remove();

    } catch(error) {
        console.log(error);
        return false;
    }

    return true;
        
}

module.exports = { deleteResponseData, deletePostData, endorseResponse, 
    undoUpvote, updateKarma, getCompanyName,
	createNewUser, getUser, getUsers, 
	removeUser, createNewTag, getTags, 
    getTagCount, removeTag, getCurrentUserID};
    