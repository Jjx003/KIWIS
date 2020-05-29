import algoliasearch from 'algoliasearch';
require('dotenv').config();

const client = algoliasearch(process.env.REACT_APP_ALGOLIA_APP_ID, process.env.REACT_APP_ALGOLIA_API_KEY);

const searchClient = algoliasearch(
   process.env.REACT_APP_ALGOLIA_APP_ID,
   process.env.REACT_APP_ALGOLIA_SEARCH_API_KEY
);

export { client, searchClient };

