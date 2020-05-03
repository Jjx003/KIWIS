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
/*
// add database functions below
let dab = db.database();

const tags =  dab.ref('bruh').child('Tags');
//tags.on('value', snap => console.log(snap.val()));

// gets the whole list of tags in the forum
function getTagList() {
    //data is the whole tag object
    let tagList = [];
    tags.once('value',function(data){  //server takes time to query data
            tagList.push(data.val());
    });
    console.log(tagList);
    return tagList;
}
*/
export default db;
