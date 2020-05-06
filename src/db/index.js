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

// Add new Response to Response table while updating the post table with new response
function pushResponse(company, r_owner_id, r_upvote_count, r_post_id, r_datetime, r_content, r_endorsed){
    
    // Company's ref
    const firebaseRef = db.database().ref(company);

    var resRef = firebaseRef.child("Response").push({owner_id: r_owner_id,
        count: r_upvote_count,
        post_id: r_post_id,
        datetime: r_datetime,
        content: r_content,
        endorsed: r_endorsed});

    var ref_id = resRef.key;   

    // Access posts to update
    const postRef = db.database().ref('bruh/Posts/');     //<-- for now as there is no post child
    
    // Update posts with Response
    var updates = {};
    postRef.once('value', function(snapshot){
        var response_array = (snapshot.val().response_ids);
        response_array.push(ref_id);
        updates[r_post_id] = response_array;
        postRef.update(updates);
    });
    
}

// Retrieve data from a specific company based off of the ref_id
function pullResponse(company, ref_id){
    const firebaseRef = db.database().ref(company);

    var response = {};
    firebaseRef.child('Response/' + ref_id).once('value', function(data) {
        data.forEach(function(child){
            response[child.key] = child.val();
        });
    });

    return response;
}


export default {db, pushResponse};
