import { Product } from '@shopify/hydrogen-react/storefront-api-types';

export interface ProductType extends Product {
  brand: {
    value: string;
    key: string;
    references: {
      edges: {
        node: {
          id: string;
          handle: string;
          type: string;
          fields: { key: string; value: string }[];
        };
      }[];
    };
  };
  relatedProducts: { value: string };
  manufacturingTime: { value: string };
  deliveryTime: { value: string };
}
