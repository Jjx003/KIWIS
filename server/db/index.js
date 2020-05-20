var firebase = require('../firebase');

function getCompanyName(user_id) {
    return firebase.db.database().ref('/UserCompaniesID/' + user_id).once('value');
}


function addPostData(forumName, p_user_id, p_title, p_tag_ids, p_content) {

    // Reference the company's firebase
    const firebaseRef = firebase.db.database().ref(forumName+"/Posts");

    var today = new Date();
    var date = (today.getMonth()+1)+'-'+today.getDate()+'-'+today.getFullYear()+' at '+today.getHours()+':'+today.getMinutes();

    // Push data inputted to firebase and also store reference of the push in "post_reference"
    try {
        var post_reference = firebaseRef.push({user_id: p_user_id,  
                                        title: p_title, 
                                        tag_ids: p_tag_ids, 
                                        date_time: date, 
                                        content: p_content, 
                                        karma: 0,
                                        responses: ["-1"], 
                                        follower_ids: ["-1"]});
    } catch(error) {
        console.log(error);
        return false;
    }

    return true;

}

// Upvoting response would look really similar
function upVotePost(forumName, post_id) {

    // Reference the post
    const firebaseRef = firebase.db.database().ref(forumName+"/Posts"+post_id);

    // Update the karma
    firebaseRef.update({karma: karma+1});

}

function endorseResponse(forumName, response_id) {

    // Reference the response
    const firebaseRef = firebase.db.database().ref(forumName+"/Responses"+response_id);

    // Endorse the response
    firebaseRef.update({endorsed: true});

}



module.exports = { endorseResponse, upVotePost, getCompanyName, addPostData };
