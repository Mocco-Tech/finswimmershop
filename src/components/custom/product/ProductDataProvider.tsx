'use client';

import { ProductProvider } from '@shopify/hydrogen-react';
import { Product } from '@shopify/hydrogen-react/storefront-api-types';
import React, { ReactNode } from 'react';

export default function ProductDataProvider({
  children,
  product,
}: {
  children: ReactNode;
  product: Product;
}) {
  return <ProductProvider data={product}>{children}</ProductProvider>;
}
