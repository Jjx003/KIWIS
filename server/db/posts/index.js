require('dotenv').config();
var { db } = require('../../firebase');
var mailgun = require("mailgun-js");
const mg = mailgun({
    apiKey: process.env.MAILGUN_API_KEY,
    domain: 'mg.kiwis.tech',
});
var parent = require('../common_models');

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

function pullResponse(company, post_id) {
    return parent.pullResponse(company, post_id);
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

function getCurrentUserID(token) {
    return parent.getCurrentUserID(token);
}

function getCompanyName(user_id) {
    return parent.getCompanyName(user_id);
}

function addFollowingUser(forumName, postID, userID) {
    return parent.addFollowingUser(forumName, postID, userID);
}

function removeFollowingUser(forumName, postID, userID) {
    return parent.removeFollowingUser(forumName, postID, userID);
}

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

function notifyUsers(companyName, posts_tags) {

    // If the post has no tags, then just return
    if (posts_tags == null || posts_tags.length == 0) {
        console.log("Post did not have tags");
        return;
    }

    const firebaseRef = db.database().ref(companyName);

    firebaseRef.once('value', function (snapshot) {

        try {
            var users_array = Object.keys(snapshot.child("Users").val());
    
        } catch (error) {
            console.log(error);
            return false;
        }

        // For each user in the company
        for (i = 0; i < users_array.length; i++) {

            var user_id = users_array[i];
            var user_email = (snapshot.child("Users/" + user_id + "/email").val());

            try {
                var curr_user_tags = Object.keys(snapshot.child("Users/" + user_id + "/tags").val());
        
            } catch (error) {
                console.log(error);
                return false;
            }

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

module.exports = { pullResponse, userMadePost, getUpvoteArray, getCompanyPosts, 
                  addPostData, getCurrentUserID, getCompanyName, addFollowingUser,
                  removeFollowingUser, isFollowingUser, deletePostData, notifyUsers }