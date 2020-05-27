var firebase_init = require('firebase');
var firebase_admin = require('firebase-admin');
var algoliasearch = require('algoliasearch');
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


// List of comapnies where key is company name (in database) and index in algolia
const companies = {}

const client = algoliasearch(process.env.ALGOLIA_APP_ID, process.env.ALGOLIA_API_KEY);
// Set an update function for all the companies
function startAlgolia(){
  db.database().ref().once('value').then((value) => {
    Object.keys(value.val()).forEach((company) => {
      // no include Registrations, UserCompaniesID, Users
      if(company == 'UXD14' || company == 'bruh' || company == 'PIzza' || company=='Sympin'){
        companies[company] = company;
      }
    })
    //console.log(companies);
    for (var key in companies) {
      const company = companies[key];
      const index = client.initIndex(company);
      index.setSettings({
        searchableAttributes: [
          'title', 'content'
        ]
      })
      const companyRef = db.database().ref(company+'/Posts');
      //child_added gets called every time the home page is loaded
      companyRef.on('child_added', (contact) => addOrUpdateIndexRecord(index, contact));
      companyRef.on('child_changed', (contact) => addOrUpdateIndexRecord(index, contact));
      companyRef.on('child_removed', (contact) => deleteIndexRecord(index, contact));
    }
  })
}

  const addOrUpdateIndexRecord = (index, contact) => {
  //console.log(index)s
  // Get Firebase object
  const record = contact.val();
  // Specify Algolia's objectID using the Firebase object key
  record.objectID = contact.key;
  // Add or update object
  index
    .saveObject(record)
    .then(() => {
      console.log('Firebase object indexed in Algolia', record.objectID);
    })
    .catch(error => {
      console.error('Error when indexing contact into Algolia', error);
      //process.exit(1);
    });
}

  const deleteIndexRecord = (index, { key }) => {
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
      //process.exit(1);
    });
}

module.exports = { db, admin, startAlgolia };