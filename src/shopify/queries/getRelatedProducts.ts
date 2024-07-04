import { getData } from '../getData';

export async function getRelatesProducts(handle: string) {
  const RelatedProductsQuery = `#graphql
    query RelatedProducts {
        productRecommendations(productId: "${handle}") {
            id
            images(first: 2) {
            edges {
                node {
                id
                url
                }
            }
            }
            title
            handle
            priceRange {
            minVariantPrice {
                amount
                currencyCode
            }
            }
        }
    }
    `;
  const { props } = await getData(RelatedProductsQuery);
  return props;
}
