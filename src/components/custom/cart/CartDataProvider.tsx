'use client';
import { CartProvider } from '@shopify/hydrogen-react';
import React, { ReactNode } from 'react';

export default function CartDataProvider({
  children,
}: {
  children: ReactNode;
}) {
  return <CartProvider>{children}</CartProvider>;
}
