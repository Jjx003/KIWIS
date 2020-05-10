var firebase = require('../firebase');
var user = firebase.db.auth().currentUser;

//function adds random data to test table
function addTestData() {
    const firebaseRef = firebase.database().ref("test");
    firebaseRef.push({name:"al;sdfkj;lss", email: "jrcabrer@ucsd.edu"});
}

try {
    console.log("my id = " + user.uid);
} catch(error) {
    console.log("user is null");
}


function getCompanyName(user_id) {

    const firebaseRef = firebase.db.database().ref("UserCompaniesID");







}


function addPostData(forumName, p_user_id, p_title, p_tag_ids, p_date_time, p_content) {

    // Reference the company's firebase
    const firebaseRef = firebase.db.database().ref(forumName+"/Posts");

    // Push data inputted to firebase and also store reference of the push in "post_reference"
    var post_reference = firebaseRef.push({user_id: p_user_id, 
                                        post_id: "", 
                                        title: p_title, 
                                        tag_ids: p_tag_ids, 
                                        date_time: p_date_time, 
                                        content: p_content, 
                                        karma: 0, 
                                        response_ids: [],
                                        follower_ids: []});
    
    // Get the new post's key
    var new_post_id = post_reference.key;

    // Update the post's id with the random generated key
    post_reference.update({post_id: new_post_id});

}

// Print the values of the post linked to the inputted key
function printPost(forumName, post_id) {

    // Reference the company's firebase and the post's key
    const firebaseRef = db.database().ref(forumName+"/Posts"+post_id);

    // Get a snapshot of the post
    firebaseRef.on("value", function(snapshot) {

        // Store the reference to the post
        var newPost = snapshot.val();

        // Print out all of the values of the post
        console.log("User's ID: " + newPost.user_id);
        console.log("Post's ID: " + newPost.post_id);
        console.log("Title: " + newPost.title);
        console.log("Tag IDs: " + newPost.tag_ids);
        console.log("Date and Time: " + newPost.date_time);
        console.log("Content: " + newPost.content);
        console.log("Karma: " + newPost.karma);
        console.log("Response IDs: " + newPost.response_ids);
        console.log("Follower IDs: " + newPost.follower_ids);

    });

}



module.exports = { addPostData, printPost, addTestData };
