import * as firebase from 'firebase';
import algoliasearch from 'algoliasearch';


const company = 'UXD14';    //needs to fix hard coding

const client = algoliasearch("36A3GKBNZI", "22dc12a10fb0cec70da7edb08015731f");
const index = client.initIndex(company); 

const searchClient = algoliasearch(
  '36A3GKBNZI',
  'faecca1d5632ce9521cda7cd1857bd20'
);


// Get all contacts from Firebase

export {searchClient, company};