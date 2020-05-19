var firebase = require('../firebase');

//function adds random data to test table
function addTestData() {
    const firebaseRef = firebase.database().ref("test");
    firebaseRef.push({name:"al;sdfkj;lss", email: "jrcabrer@ucsd.edu"});
}

// Gets user id
function getUserID() {

    var user = firebase.db.auth().currentUser;

    try {
        return user.uid;
    } catch(error) {
        console.log("user is null");
        return null;
    }

}

// Gets company name
function getCompanyName(user_id) {
    return firebase.db.database().ref('/UserCompaniesID/' + user_id).once('value');
}


// 
function pushResponse(company,r_user_id, r_post_id, r_content){
    
    // Company's ref 
    const firebaseRef = firebase.db.database().ref(company);

    //datetime month-date-year "at" time
    var today = new Date();
    var datetime = (today.getMonth()+1)+'-'+today.getDate()+'-'+today.getFullYear()+' at '+today.getHours()+':'+today.getMinutes();
    
    firebaseRef.child("Responses").push({
        user_id: r_user_id,
        karma: 0,
        post_id: r_post_id,
        datetime: datetime,
        content: r_content,
        endorsed: false});
    
}


// Retrieve data from a specific company based off of the post_id
function pullResponse(company, post_id){
    const responseRef = firebase.db.database().ref(company+ '/Responses/');
    return responseRef.orderByChild("post_id").equalTo(post_id).once("value");
}

    


module.exports = { addTestData, getUserID, getCompanyName,  pushResponse, pullResponse };
