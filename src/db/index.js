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

//function adds random data to test table, creates the table and adds data if the table doesn't exist
function addTestData() {
	const firebaseRef = db.database().ref("test");
	firebaseRef.child("test_data").set({name:"Jason", email: "jrcabrer@ucsd.edu"});
}

export default { addTestData /*, function2, function3 and so forth*/ };
