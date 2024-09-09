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
      storeDomain={process.env.NEXT_PUBLIC_PUBLIC_STORE_DOMAIN!}
      storefrontToken={process.env.NEXT_PUBLIC_PUBLIC_STOREFRONT_API_TOKEN!}
      storefrontApiVersion="2024-07"
      countryIsoCode="EE"
      languageIsoCode="EN"
    >
      {children}
    </ShopifyProvider>
  );
}
