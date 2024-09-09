'use client';

import { ShopifyProvider } from '@shopify/hydrogen-react';
import React, { ReactNode } from 'react';

export default function ShopifyDataProvider({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <ShopifyProvider
      storeDomain="https://finswimmershop.myshopify.com"
      storefrontToken="0d84fa32bf13e82e537d8816b577ff67"
      storefrontApiVersion="2024-07"
      countryIsoCode="EE"
      languageIsoCode="EN"
    >
      {children}
    </ShopifyProvider>
  );
}
