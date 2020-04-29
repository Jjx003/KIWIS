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

//function adds random data to test table
function addTestData() {
    const firebaseRef = db.database().ref("test");
    firebaseRef.push({name:"Jason", email: "jrcabrer@ucsd.edu"});
}


addTestData();
console.log("just ran method");
export default { addTestData, db /*, function2, function3 and so forth*/ };
