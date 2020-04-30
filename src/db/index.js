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

function addPostData(p_user_id, p_title, p_tag_ids, p_date_time, p_content) {

    // Reference the company's firebase "bruh"
    const firebaseRef = db.database().ref("bruh");

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
var p_user_id = 1234, p_title = "this post's title", p_tag_ids = ["Node.js", "React"];
var p_date_time = "4/29/20 at 5:00PM", p_content = "this post's content";

// Call addPostData() using the variables above
addPostData(p_user_id, p_title, p_tag_ids, p_date_time, p_content);

console.log("just ran method");

export default {addPostData, db};

/*

function addTestData() {
    const firebaseRef = db.database().ref("test");
    firebaseRef.push({name:"Jason", email: "jrcabrer@ucsd.edu"});
}


addTestData();

console.log("just ran method");
 export default { addTestData, db /*, function2, function3 and so forth };

 */

