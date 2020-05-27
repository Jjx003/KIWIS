
import algoliasearch from 'algoliasearch';

const client = algoliasearch("36A3GKBNZI", "22dc12a10fb0cec70da7edb08015731f");

const searchClient = algoliasearch(
  '36A3GKBNZI',
  'faecca1d5632ce9521cda7cd1857bd20'
);

export { client, searchClient };
