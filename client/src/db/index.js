//import * as firebase from 'firebase';
import db from '../auth/firebase';
// for the default version
import algoliasearch from 'algoliasearch';

//npm install algoliasearch react-instantsearch-dom
const company = 'UXD14';

const client = algoliasearch("36A3GKBNZI", "22dc12a10fb0cec70da7edb08015731f");
const index = client.initIndex(company); //company

const searchClient = algoliasearch(
  '36A3GKBNZI',
  'faecca1d5632ce9521cda7cd1857bd20'
);


const dbRef = db.database().ref(company);
// Get all contacts from Firebase

export function updateAlgolia(){
  db.database().ref(company).child('Posts').on('value', contacts => {
      // Build an array of all records to push to Algolia
      const records = [];
      contacts.forEach(contact => {
        // get the key and data from the snapshot
        const childKey = contact.key;
        const childData = contact.val();
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
}



export {db, dbRef, client, index, searchClient, company};