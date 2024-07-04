import { Collection } from '@shopify/hydrogen-react/storefront-api-types';
import { ProductType } from './ProductType';

export interface CollectionType extends Collection {
  data: {
    collectionByHandle: {
      handle: string;
      title: string;
      description: string;
      image: {
        src: string;
        url: string;
        altText: string;
      };
      products: {
        edges: { cursor?: string; node: ProductType }[];
      };
      productsAll: {
        edges: { cursor?: string; node: ProductType }[];
      };
      seo: {}[];
    };
  };
}
