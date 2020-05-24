var {firebase} = require('../firebase');
var {db} = require('../firebase');
var auth = require('../auth/index');

// add database functions below

// NOTE (Eric): in order to get userId: firebase.auth().currentUser.uid
// Also, forumDBRef requires the forumName so they can access the specific company

// "POST" method for new tags
function createNewTag(forumName, tagName) {
    const forumDBRef = firebase.db.database().ref(forumName);
    var tag = {};
    tag[tagName] = {count: 0};
    forumDBRef.child("Tags").update(tag);
}

// "GET" method for tags in forums 
function getTags(forumName) {
    return firebase.db.database().ref(forumName).child('Tags').once('value');
}

// "GET" method for a tag's number 
function getTagCount(forumName, tagName) {
    return firebase.db.database().ref(forumName).child('Tags/' + tagName).once('value');
}

// Removes a tag from the company
function removeTag(forumName, tagName) {
    firebase.db.database().ref(forumName).child('Tags').child(tagName).remove();
    removeTagFromAllUsers(forumName, tagName);

}

// Removes the tags from the users of a company
function removeTagFromAllUsers(forumName, tagName) {
    const forumDBRef = firebase.db.database().ref(forumName);
    forumDBRef.child('Users').once('value').then((data) => {

        // Goes to every user
        data.forEach(function (child) {
            console.log(child.key)
            removeSpecialization(forumName, child.key, tagName);


            // child.forEach(function (grandchild) {

            //     // goes to the tags object in the user
            //     if(grandchild.key === 'tags') {
            //         console.log(grandchild.key + " : " + grandchild.val());

            //         // Checks every tag and removes the one that doesn't matter
            //         grandchild.forEach(function (tagNameChild) {

            //             //Checks which tag to remove
            //             if(tagNameChild.val() === tagName) {
            //                 forumDBRef.child('Users/' + child.key).child('tags/' + tagNameChild.key).remove()
            //             }
            //         });
            //     }
            // });
        });
    });
}

function getUserTags(forumName, userID) {
    return firebase.db.database().ref(forumName).child('Users').child(userID).child('tags').once('value');
}

function getUserEmail(forumName, userID) {
    return firebase.db.database().ref(forumName).child('Users').child(userID).child('email').once('value');
}

function isUserAdmin(forumName, userID) {
    return firebase.db.database().ref(forumName).child('Users').child(userID).child('admin').once('value');
}

function addSpecialization(forumName, userID, tagName) {
    var tagtoadd = {};
    tagtoadd[tagName] = tagName;
    firebase.db.database().ref(forumName).child('Users/').child(userID).child('tags').update(tagtoadd);
}


function removeSpecialization(forumName, userID, tagName) {
    firebase.db.database().ref(forumName).child('Users/').child(userID).child('tags').child(tagName).remove();
}

  

// "POST" method for a new user 
function createNewUser(registration_ID, forumName, firstName, lastName, email, password, isAdmin) {

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
            }).catch((error) => {
                reject(new Error(error));
            });
            
        } catch(error) {
            console.log(error);
            reject(new Error(error));
        }
    })
}

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
            child.forEach(function (grandchild) {

                // goes to the tags object in the user
                if(grandchild.key === 'tags') {
                    console.log(grandchild.key + " : " + grandchild.val());

                    // Checks every tag and removes the one that doesn't matter
                    grandchild.forEach(function (tagNameChild) {

                        //Checks which tag to remove
                        if(tagNameChild.val() === tagName) {
                            forumDBRef.child('Users/' + child.key).child('tags/' + tagNameChild.key).remove()
                        }
                    });
                }
            });
        });
    });
}	


// "GET" method for a user's id
function getCurrentUserID(token) {
    return new Promise(function(resolve, reject) {
        firebase.admin.auth().verifyIdToken(token).then((decodedToken) => {
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
    const firebaseRef = firebase.db.database().ref(company).child('Posts');
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
    firebase.db.database().ref(companyTags).once('value', tagSnapshot => {
        tagSnapshot.forEach(tag => {
            var x = tag.key;
            tags = [...tags, { key: x, text: x, value: x }];
        });
    });
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

function checkRegistration(id) {
    return new Promise (function (resolve, reject) {
        db.database().ref('/Registrations/' + id).once('value').then((result) => {
            resolve(result.val());
        }).catch((error) => {
            reject(new Error(error));
        });
    })
}

function toggleAdmin(forumName, userID){
    firebase.db.database().ref(forumName).child('Users/' + userID).child("admin").once('value').then( (data) => {
        if(data.val()){
            firebase.db.database().ref(forumName).child('Users/' + userID).update({admin: false});
            firebase.admin.auth().updateUser(userID, {emailVerified: false});
        }
        else{
            firebase.db.database().ref(forumName).child('Users/' + userID).update({admin: true});
            firebase.admin.auth().updateUser(userID, {emailVerified: true});
        }
    });
}

module.exports = { 
    createForum, getCompanyName, getCurrentUserID,
	createNewUser, getUser, getUsers, 
	removeUser, createNewTag, getTags, 
    getTagCount, removeTag, getCurrentUserID,
    checkRegistration, getUserTags, removeSpecialization,
    addSpecialization, removeAllUserTags, toggleAdmin,
    getCompanyPosts, getCompanyTags, getUserEmail,
    isUserAdmin
};