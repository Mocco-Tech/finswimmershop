import { getData } from '../getData';

export async function getAllCollections() {
  const Collections = `#graphql
    query Collections {
        collections(first: 250) {
            edges {
            node {
                id
                handle
            }
            }
        }
}`;
  const { props } = await getData(Collections);
  return props;
}
