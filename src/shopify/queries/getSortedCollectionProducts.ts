import { getData } from '../getData';

export async function getSortedCollectionProducts(
  handle: string,
  sortKey: string,
  reverse: boolean
) {
  const Collection = `#graphql
    query Collection {
    metaobjects(type: "text", first: 10) {
      edges {
        node {
          id
        }
    }}
    collectionByHandle(handle: "${handle}") {
      handle
      title
      description
      image {
        src
        url
        altText
      }
      products(first: 10) {
        edges {
          node {
            handle
            title
            priceRange {
              minVariantPrice {
                amount
                currencyCode
              }
            }
            images(first: 2) {
              edges {
                node {
                  id
                  url
                }
              }
            }
            id
            publishedAt
            brand: metafield(namespace: "custom", key: "brand") {
              key
              value
              references(first: 10) {
                edges {
                  node {
                    ... on Metaobject {
                      id
                      handle
                      type
                      fields {
                        key
                        value
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }`;
  const { props } = await getData(Collection);
  return props;
}
