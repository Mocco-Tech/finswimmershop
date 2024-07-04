import React from 'react';
import { Params } from 'next/dist/shared/lib/router/utils/route-matcher';

import { getCollection } from '@/shopify/queries/getCollection';
import { CollectionType } from '@/types/CollectionType';
import CollectionContent from '@/components/custom/collection/CollectionContent';
import { getSortedProducts } from '@/lib/helpers';

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
