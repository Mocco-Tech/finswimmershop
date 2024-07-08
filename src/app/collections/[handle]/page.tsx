import React from 'react';
import { Params } from 'next/dist/shared/lib/router/utils/route-matcher';

import { getCollection } from '@/shopify/queries/getCollection';
import { CollectionType } from '@/types/CollectionType';
import CollectionContent from '@/components/custom/collection/CollectionContent';
import { getSortedProducts } from '@/lib/helpers';

export const revalidate = 3600;

export default async function ProductCategoryPage({
  params,
  searchParams,
}: {
  params: Params;
  searchParams: { brand: string; sortBy: string };
}) {
  const collection: CollectionType = await getCollection(params.handle);

  getSortedProducts(
    collection.data.collectionByHandle.products.edges,
    searchParams.sortBy
  );

  if (searchParams.brand) {
    const filteredProducts =
      collection.data.collectionByHandle.products.edges.filter(
        (product) =>
          product.node?.brand?.references?.edges?.[0]?.node.handle ===
          searchParams.brand
      );
    return (
      <CollectionContent
        collection={collection}
        products={filteredProducts}
        productsAll={collection.data.collectionByHandle.productsAll.edges}
      />
    );
  }

  return (
    <CollectionContent
      collection={collection}
      products={collection.data.collectionByHandle.products.edges}
      productsAll={collection.data.collectionByHandle.productsAll.edges}
    />
  );
}

export async function generateMetadata({
  params,
}: {
  params: { handle: string };
}) {
  const props = await getCollection(params.handle);
  const collectionSeo = props?.data?.collectionByHandle;

  const seoTitle = collectionSeo?.seo.title
    ? collectionSeo?.seo.title
    : collectionSeo.title;
  const seoDescription = collectionSeo?.seo.description
    ? collectionSeo?.seo.description
    : collectionSeo.description;
  const image = collectionSeo?.image?.src
    ? collectionSeo?.image?.src
    : '/empty-category.jpg';

  return {
    title: `Finswimmer Shop | ${seoTitle}`,
    description: seoDescription,

    metadataBase: new URL('https://www.finswimmershop.com'),
    openGraph: {
      title: `Finswimmer Shop | ${seoTitle}`,
      description: seoDescription,
      url: `https://www.finswimmershop.com/collections/${params?.handle}`,
      siteName: 'Finswimmer Shop',
      images: [
        {
          url: image,
          width: 800,
          height: 600,
        },
      ],
      locale: 'en_US',
      type: 'website',
    },
  };
}
