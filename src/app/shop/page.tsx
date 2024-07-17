import React from 'react';

import { getProducts } from '@/shopify/queries/getProducts';
import { ProductType } from '@/types/ProductType';
import ShopContent from '@/components/custom/shop/ShopContent';
import { getSortedProducts } from '@/lib/helpers';
import { Metadata } from 'next';
import { PER_PAGE } from '@/lib/consts';

export const revalidate = 3600;

export default async function ShopPage({
  searchParams,
}: {
  searchParams: { brand: string; sortBy: string; page: string };
}) {
  const props = await getProducts();
  const productsArr: { node: ProductType }[] = props.data.products.edges;
  const productsAll: { node: ProductType }[] = props.data.productsAll.edges;

  const page = searchParams.page ?? '1';
  const start = (Number(page) - 1) * PER_PAGE;
  const end = start + PER_PAGE;

  let products = productsArr.slice(start, end);

  getSortedProducts(products, searchParams.sortBy);

  if (searchParams.brand) {
    const filteredProducts = products.filter(
      (product) =>
        product.node?.brand?.references?.edges?.[0]?.node.handle ===
        searchParams.brand
    );
    return (
      <ShopContent
        products={filteredProducts}
        productsAll={productsAll}
        end={end}
      />
    );
  }

  return (
    <ShopContent products={products} productsAll={productsAll} end={end} />
  );
}

export const metadata: Metadata = {
  title: 'Finswimmer Shop | Shop all',
  description:
    "Finswimming, Freeidivng and UW Hockey, UW Rugby gears from the world's leading manufacturers at best prices. Shop all - we ship worldwide.",

  metadataBase: new URL('https://www.finswimmershop.com'),
  openGraph: {
    title: `Finswimmer Shop | Shop all`,
    description:
      "Finswimming, Freeidivng and UW Hockey, UW Rugby gears from the world's leading manufacturers at best prices. Shop all - we ship worldwide.",
    url: `https://finswimmershop.com/shop`,
    siteName: 'Finswimmer Shop',
    images: [
      {
        url: '/empty-category.jpg',
        width: 800,
        height: 600,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
};
