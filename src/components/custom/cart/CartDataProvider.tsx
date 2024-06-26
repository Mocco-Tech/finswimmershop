'use client';
import { CartProvider } from '@shopify/hydrogen-react';
import React, { ReactNode } from 'react';

export default function CartDataProvider({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <CartProvider
      onLineAdd={() => {
        console.log('a line is being added');
      }}
      onLineAddComplete={() => {
        console.log('a line has been added');
      }}
    >
      {children}
    </CartProvider>
  );
}
