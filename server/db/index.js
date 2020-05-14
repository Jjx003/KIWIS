var firebase = require('../firebase');

//function adds random data to test table
function addTestData() {
    const firebaseRef = firebase.database().ref("test");
    firebaseRef.push({name:"al;sdfkj;lss", email: "jrcabrer@ucsd.edu"});
}


function getUserID() {

    var user = firebase.db.auth().currentUser;

    try {
        return user.uid;
    } catch(error) {
        console.log("user is null");
        return null;
    }

}

function getCompanyName(user_id) {
    return firebase.db.database().ref('/UserCompaniesID/' + user_id).once('value');
}

//  cd into Client npm start
// cd server node app.js


// 
function pushResponse(company,r_user_id, r_post_id, r_content){
    
    // Company's ref 
    const firebaseRef = firebase.db.database().ref(company);

    //datetime month-date-year "at" time
    var today = new Date();
    var datetime = (today.getMonth()+1)+'-'+today.getDate()+'-'+today.getFullYear()+' at '+today.getHours()+':'+today.getMinutes();
    
    var resRef = firebaseRef.child("Responses").push({
        user_id: r_user_id,
        karma: 0,
        post_id: r_post_id,
        datetime: datetime,
        content: r_content,
        endorsed: false});
    
    var ref_id = resRef.key;   
    // Access posts to update
    const postRef = firebase.db.database().ref(company + '/Posts/' + r_post_id);     //company name
    
    // Update posts with response_id
    var updates = {};
    postRef.once('value', function(snapshot){
        var response_array = (snapshot.child("responses").val());
        response_array.push(ref_id);
        updates["responses"] = response_array;
        postRef.update(updates);
    
    });
    
}


    // Retrieve data from a specific company based off of the resp_id
function pullResponse(company, resp_id){
    const postRef = firebase.db.database().ref(company+ '/Responses/' + resp_id);
    postRef.once("value", function(snapshot){
        var data = snapshot.val();
        console.log("User's ID: " + data.user_id);
        console.log("Karma: " + data.karma);
        console.log("PostID: " + data.post_id);
        console.log("Datetime: " + data.datetime);
        console.log("Content: " + data.content);
        console.log("Endorsed: " + data.endorsed);
            

    });
}

    


module.exports = { addTestData, getUserID, getCompanyName,  pushResponse, pullResponse };
