import { getData } from "../getData";

export async function getCollection(handle: string) {
  const Collection = `#graphql
    query Collection {
    collectionByHandle(handle: "${handle}") {
      handle
      title
      description
      image {
        src
        url
        altText
      }
      products(first: 250) {
        edges {
          cursor
          node {
            handle
            title
            description
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
      productsAll: products(first: 250, sortKey: COLLECTION_DEFAULT) {
        edges {
          cursor
          node {
            handle
            title
            
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
        seo {
          title
          description
        }
      }
  }`;
  const { props } = await getData(Collection);
  return props;
}
