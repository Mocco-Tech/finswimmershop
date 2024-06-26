// import {
//   publicStorefrontToken,
//   storeDomain,
//   storefrontApiVersion,
// } from '@/components/custom/ShopifyDataProvider';
import { createStorefrontClient } from '@shopify/hydrogen-react';

// export const storeDomain = process.env.PUBLIC_STORE_DOMAIN as string;
// export const publicStorefrontToken = process.env
//   .PUBLIC_STOREFRONT_API_TOKEN as string;
// export const storefrontApiVersion = process.env
// .PUBLIC_STORE_API_VERSION as string;

export const client = createStorefrontClient({
  // load environment variables according to your framework and runtime
  storeDomain: process.env.PUBLIC_STORE_DOMAIN,
  publicStorefrontToken: process.env.PUBLIC_STOREFRONT_API_TOKEN,
  privateStorefrontToken: process.env.PRIVATE_STOREFRONT_API_TOKEN,
  storefrontApiVersion: '2024-04',
  contentType: 'json',
});
