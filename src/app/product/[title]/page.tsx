import React from 'react';
import ProductDataProvider from '@/components/custom/product/ProductDataProvider';

import { getData } from '@/shopify/getData';
import ProductContent from '@/components/custom/product/ProductContent';

const GRAPHQL_QUERY = `#graphql
  query MyQuery {
  product(id: "gid://shopify/Product/9392009314629") {
    title
    description
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
    featuredImage {
        altText
        url
        height
        width
      }
  }
}
`;

export default async function ProductPage() {
  const { props } = await getData(GRAPHQL_QUERY);
  // console.log(props.data);

  return (
    <ProductDataProvider product={props.data.product}>
      <ProductContent />
    </ProductDataProvider>
  );
}
