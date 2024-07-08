import { getData } from '../getData';

export async function getSearchProducts(query: string) {
  const products = `#graphql
    query Products {
        search(query: "${query}", first: 50) {
        edges {
        node {
            ... on Product {
            handle
            title
            id
            priceRange {
                minVariantPrice {
                amount
                currencyCode
                }
            }
            images(first: 2) {
                edges {
                node {
                    url
                }
                }
            }
            }
        }
        }
    }
  }`;
  const { props } = await getData(products);
  return props;
}
