import * as firebase from 'firebase';


const db = firebase.initializeApp({
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_DATABASE_URL,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_ID,
    measurementId: process.env.REACT_APP_MEASUREMENT_ID
});

// add database functions below

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

// Print the values of the post that is in the database
var forumName = "bruh", post_id = "-M67VDK6MLzICpgZPPPr";
//printPost(forumName, post_id);

function addPostData(forumName, p_user_id, p_title, p_tag_ids, p_date_time, p_content) {

    // Reference the company's firebase
    const firebaseRef = db.database().ref(forumName+"/Posts");

    // Push data inputted to firebase and also store reference of the push in "post_reference"
    var post_reference = firebaseRef.push({user_id: p_user_id, 
                                        post_id: "", 
                                        title: p_title, 
                                        tag_ids: p_tag_ids, 
                                        date_time: p_date_time, 
                                        content: p_content, 
                                        karma: 0, 
                                        response_ids: [1, 2, 3, 4],
                                        follower_ids: [5, 6, 7]});
    
    // Get the new post's key
    var new_post_id = post_reference.key;

    // Update the post's id with the random generated key
    post_reference.update({post_id: new_post_id});

}

// Making test variables to pass into addPostData()
var p_user_id = 237569275, p_title = "this post's title", p_tag_ids = ["Node.js", "React"];
var p_date_time = "4/29/20 at 5:00PM", p_content = "this post's content";

// Call addPostData() using the variables above
addPostData(forumName, p_user_id, p_title, p_tag_ids, p_date_time, p_content);

export default {db, addPostData, printPost};

