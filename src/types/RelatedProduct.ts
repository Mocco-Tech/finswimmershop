import {
  CurrencyCode,
  Product,
} from '@shopify/hydrogen-react/storefront-api-types';
import { PartialObjectDeep } from 'type-fest/source/partial-deep';

export interface ExtendetProduct
  extends PartialObjectDeep<Product, { recurseIntoArrays: true }> {
  relatedProducts: { references: { edges: RelatedProduct[] } };
}

interface RelatedProduct {
  node: {
    id: string;
    title: string;
    handle: string;
    priceRange: {
      minVariantPrice: { amount: string; currencyCode: CurrencyCode };
    };
    compareAtPrice?: { amount: string; currencyCode: CurrencyCode };
    images: { edges: { node: { id: string; url: string } }[] };
  };
}
