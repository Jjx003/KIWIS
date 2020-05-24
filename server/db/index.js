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
    admin.auth().deleteUser(userID);
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
function createNewUser(registration_ID, forumName, firstName, lastName, email, password, isAdmin) {
    //firebase.db.database().update(forumName);
    //firebase.db.database().ref(forumName).update("Users");

    return new Promise(function(resolve, reject){

        try {

            // Check if user is admin and if the company already exists
            if(isAdmin == true) {
                db.database().ref(forumName).once("value", snapshot => {
                    if(snapshot.exists()) {
                        console.log("This company already exists");
                        resolve(false);
                        return;
                    }
                })
            }

            const forumDBRef = db.database().ref(forumName);
            auth.signUp(email, password, isAdmin).then((data) => {
                var userID = data.uid;
                var user = {};

                // Creates a new user object with the userID as a key
                user[userID] =  {
                    firstName: firstName,
                    lastName: lastName,
                    email: email,
                    admin: isAdmin,
                    tags: {'announcements':'announcements', 'help-needed':'help-needed'},
                    following_IDs: []
                };
                forumDBRef.child("Users").update(user);

                var mapUserToCompany = {};
                mapUserToCompany[userID] = forumName;
                db.database().ref("UserCompaniesID").update(mapUserToCompany);

                if(isAdmin == false) {

                    db.database().ref("Registrations").child(registration_ID).remove();

                }

                resolve(true);
            });
            
        } catch(error) {
            console.log(error);
            reject(new Error(error));
        }
    })

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


// Gets metadata for user activity and tag popularity
// Returns: Count of Tags used in Posts, Count of Posts/Responses per User
function getMetadata(forumName) {
    return new Promise(function(resolve, reject) {
        var metaData = {'tagCount': {}, 'userCount': {}, 'userIDCount': {}};
        db.database().ref(forumName).child('Posts').once('value').then( (data) => {

            // For each post
            Object.keys(data.val()).forEach(postID => {
    
                // For each post's tags
                Object.keys(data.val()[postID]['tag_ids']).forEach(tagIndex => {
                    var tagName = data.val()[postID]['tag_ids'][tagIndex];
                    console.log(tagName)
                    
                    if (tagName in metaData['tagCount']) {
                        metaData['tagCount'][tagName] += 1;
                    } else {
                        console.log('Tag ' + '\"' + tagName + '\"' + " not counted, currently adding to metadata");
                        metaData['tagCount'][tagName] = 1;
                    }
                });
    
                // For each post's owner
                var userID = data.val()[postID]['user_id'];
                if(userID in metaData['userIDCount']) {
                    metaData['userIDCount'][userID] += 1;
                } else {
                    console.log('UserID ' + '\"' + userID + '\"' + " not counted, currently adding to metadata");
                    metaData['userIDCount'][userID] = 1;
                }
                getUsers(forumName).then(data => {
                    Object.keys(metaData['userIDCount']).forEach(userID => {
                        var userFullName = data.val()[userID]['firstName'] + " " + data.val()[userID]['lastName'];
                        metaData['userCount'][userFullName] = metaData['userIDCount'][userID];
                    });
                    resolve(metaData);
                });
    
            })
        }).catch(err => {
            reject(err);
        });
    })
}


module.exports = { 
    getCompanyName, createNewUser, getUser, getUsers, 
	removeUser, createNewTag, getTags, 
    getTagCount, removeTag, getCurrentUserID,
    getUserTags, removeSpecialization,
    addSpecialization, removeAllUserTags, toggleAdmin,
    getCompanyPosts, getCompanyTags, getUserEmail,
    isUserAdmin, pullResponse, pushResponse, checkRegistration,
    getMetadata
};