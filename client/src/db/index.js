import * as firebase from 'firebase';
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



export {client, index, searchClient, company};
