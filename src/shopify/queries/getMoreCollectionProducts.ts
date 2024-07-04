import { getClientData, getData } from '../getData';

export async function getMoreCollectionProducts(handle: string, from: string) {
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
      products(first: 20, after: "${from}") {
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

  const { props } = await getClientData(Collection);
  return props;
}
