import { getData } from '../getData';

export async function getSingleProduct(handle: string) {
  const SingleProductQuery = `#graphql
    query SingleProductQuery {
      productByHandle(handle: "${handle}") {
      handle
      id
      title
      description
      descriptionHtml
      productType
      deliveryTime: metafield(namespace: "custom", key: "delivery_time") {
        value
      }
      manufacturingTime: metafield(namespace: "custom", key: "manufacturing_time") {
        value
      }
      brand: metafield(namespace: "custom", key: "brand") {
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
      relatedProducts: metafield(namespace: "shopify--discovery--product_recommendation", key: "related_products") {
        value
      }
      metafields(identifiers: [
        {key: "blade_stiffness", namespace: "custom"},
        {key: "size", namespace: "custom"},
        {key: "rails_color", namespace: "custom"}
        ]) {
        id
        key
        value
        references(first: 50) {
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
      variants(first: 100) {
        edges {
          node {
            id
            title
            price {
              amount
              currencyCode
            }
            selectedOptions {
              name
              value
            }
          }
        }
      }
        images(first: 10) {
        edges {
          node {
            id
            url
          }
        }
      }
      collections(first: 10) {
        edges {
          node {
            id
            title
          }
        }
      }
      seo {
        description
        title
      }
    }
  }
  `;
  const { props } = await getData(SingleProductQuery);
  return props;
}
