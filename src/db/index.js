import * as firebase from 'firebase';
// for the default version
import algoliasearch from 'algoliasearch';
const dotenv = require('dotenv');
dotenv.config();

const client = algoliasearch(process.env.ALGOLIA_APP_ID, process.env.ALGOLIA_API_KEY);
const index = client.initIndex(process.env.ALGOLIA_INDEX_NAME);

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

// Get all contacts from Firebase
db.database().ref('/ALGOLIA_TESSTING').once('value', contacts => {
    // Build an array of all records to push to Algolia
    const records = [];
    contacts.forEach(contact => {
      // get the key and data from the snapshot
      const childKey = contact.key;
      const childData = contact.val();
      console.log(childData)
      // We set the Algolia objectID as the Firebase .key
      childData.objectID = childKey;
      // Add object for indexing
      records.push(childData);
    });
  
    // Add or update new objects
    index
      .saveObjects(records)
      .then(() => {
        console.log('Contacts imported into Algolia');
      })
      .catch(error => {
        console.error('Error when importing contact into Algolia', error);
        process.exit(1);
      });
  });

// add database functions below

function search() {

}


export default {db, client, index, search};
