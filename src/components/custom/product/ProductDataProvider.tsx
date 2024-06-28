'use client';

import { ProductProvider } from '@shopify/hydrogen-react';
import {
  CurrencyCode,
  Product,
} from '@shopify/hydrogen-react/storefront-api-types';
import React, { ReactNode, createContext } from 'react';

type RelatedProductType = {
  id: string;
  title: string;
  handle: string;
  priceRange: {
    minVariantPrice: { amount: string; currencyCode: CurrencyCode };
  };
  images: { edges: { node: { id: string; url: string } }[] };
};

export const RelatedProductsContext = createContext<
  RelatedProductType[] | null
>(null);

export default function ProductDataProvider({
  children,
  product,
  relatedProducts,
}: {
  children: ReactNode;
  product: Product;
  relatedProducts: RelatedProductType[];
}) {
  return (
    <ProductProvider data={product}>
      <RelatedProductsContext.Provider value={relatedProducts}>
        {children}
      </RelatedProductsContext.Provider>
    </ProductProvider>
  );
}
