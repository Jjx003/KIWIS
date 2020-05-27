<<<<<<< HEAD
import algoliasearch from 'algoliasearch';
require('dotenv').config();

const client = algoliasearch(process.env.REACT_APP_ALGOLIA_APP_ID, process.env.REACT_APP_ALGOLIA_API_KEY);
=======

import algoliasearch from 'algoliasearch';

const client = algoliasearch("36A3GKBNZI", "22dc12a10fb0cec70da7edb08015731f");
>>>>>>> 3d05912a639a20133c629b2981057dad1783b6f7

const searchClient = algoliasearch(
   process.env.REACT_APP_ALGOLIA_APP_ID,
   process.env.REACT_APP_ALGOLIA_SEARCH_API_KEY
);

export {client, searchClient};