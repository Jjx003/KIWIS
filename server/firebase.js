var firebase_init = require('firebase');
var firebase_admin = require('firebase-admin');
require('dotenv').config();

const db = firebase_init.initializeApp({
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.AUTH_DOMAIN,
    databaseURL: process.env.DATABASE_URL,
    projectId: process.env.PROJECT_ID,
    storageBucket: process.env.STORAGE_BUCKET,
    messagingSenderId: process.env.MESSAGING_SENDER_ID,
    appId: process.env.ID,
    measurementId: process.env.MEASUREMENT_ID
});

// used for generating tokens
var serviceAccount = require("./serviceKey.json");
const admin = firebase_admin.initializeApp({
  credential: firebase_admin.credential.cert(serviceAccount),
  databaseURL: process.env.DATABASE_URL
});

/*
const tableRef = db.ref('/TABLE_NAME_HERE');
tableRef.on('child_added', addOrUpdateIndexRecord);
tableRef.on('child_changed', addOrUpdateIndexRecord);
tableRef.on('child_removed', deleteIndexRecord);

function addOrUpdateIndexRecord(item) {
  // Get Firebase object
  const record = item.val();
  // Specify Algolia's objectID using the Firebase object key
  record.objectID = item.key;
  // Add or update object
  index
    .saveObject(record)
    .then(() => {
      console.log('Firebase object indexed in Algolia', record.objectID);
    })
    .catch(error => {
      console.error('Error when indexing contact into Algolia', error);
      process.exit(1);
    });
}

function deleteIndexRecord({key}) {
  // Get Algolia's objectID from the Firebase object key
  const objectID = key;
  // Remove the object from Algolia
  index
    .deleteObject(objectID)
    .then(() => {
      console.log('Firebase object deleted from Algolia', objectID);
    })
    .catch(error => {
      console.error('Error when deleting contact from Algolia', error);
      process.exit(1);
    });
}
*/

module.exports = { db, admin };