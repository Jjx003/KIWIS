var {firebase} = require('../firebase');
var {db} = require('../firebase');
var {admin} = require('../firebase');

// "POST" method for responses
function pushResponse(company,r_user_id, r_post_id, r_content){
    
    // Company's ref 
    const firebaseRef = db.database().ref(company);

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
    const responseRef = db.database().ref(company+ '/Responses/');
    return responseRef.orderByChild("post_id").equalTo(post_id).once("value");
}

    



var auth = require('../auth/index');

// add database functions below

// NOTE (Eric): in order to get userId: firebase.auth().currentUser.uid
// Also, forumDBRef requires the forumName so they can access the specific company

// "POST" method for new tags
function createNewTag(forumName, tagName) {
    const forumDBRef = db.database().ref(forumName);
    var tag = {};
    tag[tagName] = {count: 0};
    forumDBRef.child("Tags").update(tag);
}

// "GET" method for tags in forums 
function getTags(forumName) {
    return db.database().ref(forumName).child('Tags').once('value');
}

// "GET" method for a tag's number 
function getTagCount(forumName, tagName) {
    return db.database().ref(forumName).child('Tags/' + tagName).once('value');
}

// Removes a tag from the company
function removeTag(forumName, tagName) {
    db.database().ref(forumName).child('Tags').child(tagName).remove();
    removeTagFromAllUsers(forumName, tagName);

}

// Removes the tags from the users of a company
function removeTagFromAllUsers(forumName, tagName) {
    const forumDBRef = db.database().ref(forumName);
    forumDBRef.child('Users').once('value').then((data) => {

        // Goes to every user
        data.forEach(function (child) {
            console.log(child.key)
            removeSpecialization(forumName, child.key, tagName);
        });
    });
}	

function addSpecialization(forumName, userID, tagName) {
    var tagtoadd = {};
    tagtoadd[tagName] = tagName;
    db.database().ref(forumName).child('Users/').child(userID).child('tags').update(tagtoadd);
}

function removeSpecialization(forumName, userID, tagName) {
    db.database().ref(forumName).child('Users/').child(userID).child('tags').child(tagName).remove();
}

function isUserAdmin(forumName, userID) {
    return db.database().ref(forumName).child('Users').child(userID).child('admin').once('value');
}

// "GET" method for a user's id
function getCurrentUserID(token) {
    return new Promise(function(resolve, reject) {
        admin.auth().verifyIdToken(token).then((decodedToken) => {
            resolve(decodedToken.uid);
        }).catch((error) => {
            reject(new Error(error));
        });
    })
}

// "GET" method for a user 
function getUser(forumName, userID) {
    return db.database().ref(forumName).child('Users/' + userID).once('value');
}

// "GET" method for users
function getUsers(forumName) {
    return db.database().ref(forumName).child('Users').once('value');
}

// Removes a user from the database
function removeUser(forumName, userID) {
    db.database().ref(forumName).child('Users').child(userID).remove();
}

    
function getCompanyPosts(company, posts){
    const firebaseRef = db.database().ref(company).child('Posts');
    firebaseRef.on('value', postSnapshot => {
        postSnapshot.forEach(postId => {
            let post = postId.val();
            post.key = postId.key;
            post.visible = true;  
            posts.unshift(post);   
        });
    });
}

function getCompanyTags(company){
    const companyTags = company.concat('/Tags');
    const tags = [];
    db.database().ref(companyTags).once('value', tagSnapshot => {
        tagSnapshot.forEach(tag => {
            var x = tag.key;
            tags = [...tags, { key: x, text: x, value: x }];
        });
    });
}


// "POST" method for a new user 
function createNewUser(forumName, firstName, lastName, email, password) {
    const forumDBRef = db.database().ref(forumName);
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
        db.database().ref("UserCompaniesID").update(mapUserToCompany);
    });
}

// "GET" method for a user's id
function getCurrentUserID(token) {
    return new Promise(function(resolve, reject) {
        admin.auth().verifyIdToken(token).then((decodedToken) => {
            resolve(decodedToken.uid);
        }).catch((error) => {
            reject(new Error(error));
        });
    })
}

// "GET" method for a user 
function getUser(forumName, userID) {
    return db.database().ref(forumName).child('Users/' + userID).once('value');
}

// "GET" method for users
function getUsers(forumName) {
    return db.database().ref(forumName).child('Users').once('value');
}

// Removes a user from the database
function removeUser(forumName, userID) {
    db.database().ref(forumName).child('Users').child(userID).remove();
}

function getCompanyName(user_id) {
    return new Promise(function (resolve, reject) {
        db.database().ref('/UserCompaniesID/' + user_id).once('value').then((snapshot) => {
            resolve(snapshot.val());
        }).catch((error) => {
            reject(new Error(error));
        });
    });
}

function checkRegistration(id) {
    return new Promise (function (resolve, reject) {
        db.database().ref('/Registrations/' + id).once('value').then((result) => {
            resolve(result.val());
        }).catch((error) => {
            reject(new Error(error));
        });
    });
}

function getUserEmail(forumName, userID) {
    return db.database().ref(forumName).child('Users').child(userID).child('email').once('value');
}

function removeAllUserTags(forumName, user_id) {
    const userTags = db.database().ref(forumName).child('Users/').child(user_id).child('tags');
    userTags.once('value').then((data) => { 
         data.forEach(function (child) {
            userTags.child(child.key).remove();
         });
    });
}

function getUserTags(forumName, userID) {
    return db.database().ref(forumName).child('Users').child(userID).child('tags').once('value');
}

function toggleAdmin(forumName, userID){
    db.database().ref(forumName).child('Users/' + userID).child("admin").once('value').then( (data) => {
        if(data.val()){
            db.database().ref(forumName).child('Users/' + userID).update({admin: false});
            admin.auth().updateUser(userID, {emailVerified: false});
        }
        else{
            db.database().ref(forumName).child('Users/' + userID).update({admin: true});
            admin.auth().updateUser(userID, {emailVerified: true});
        }
    });
}

module.exports = { 
    getCompanyName, createNewUser, getUser, getUsers, 
	removeUser, createNewTag, getTags, 
    getTagCount, removeTag, getCurrentUserID,
    getUserTags, removeSpecialization,
    addSpecialization, removeAllUserTags, toggleAdmin,
    getCompanyPosts, getCompanyTags, getUserEmail,
    isUserAdmin, pullResponse, pushResponse, checkRegistration
};
