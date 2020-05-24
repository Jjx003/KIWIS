<<<<<<< HEAD
//import * as firebase from 'firebase';
import db from '../auth/firebase';
=======
>>>>>>> 12aaeea4d5a8b86e1071b41c40f806bde29648ec
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


<<<<<<< HEAD
const dbRef = db.database().ref(company);
// Get all contacts from Firebase
=======

>>>>>>> 12aaeea4d5a8b86e1071b41c40f806bde29648ec

export {client, index, searchClient, company};