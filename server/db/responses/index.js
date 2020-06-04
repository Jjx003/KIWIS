require('dotenv').config();
var parent = require('../index');
var { db } = require('../../firebase');
var { admin } = require('../../firebase');
var auth = require('../../auth/index');
var mailgun = require("mailgun-js");
const mg = mailgun({
    apiKey: process.env.MAILGUN_API_KEY,
    domain: 'mg.kiwis.tech',
});
var parent = require('../index');


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

function getCurrentUserID(token) {
    return parent.getCurrentUserID(token);
}

function getCompanyName(user_id) {
    return parent.getCompanyName(user_id);
}

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

function pullResponse(company, post_id) {
    return parent.pullResponse(company, post_id);
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


module.exports = {getCurrentUserID, getCompanyName, pushResponse, pullResponse,
                  deleteResponseData, updateKarma, undoUpvote, endorseResponse,
                  undoEndorse, notifyUsersResponses }