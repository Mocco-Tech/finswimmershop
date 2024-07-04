'use client';
import React, { useState } from 'react';
import { CollectionType } from '@/types/CollectionType';
import { ProductType } from '@/types/ProductType';
import { isItemNew } from '@/lib/helpers';
import Banner from './banner-section/Banner';
import ProductCard from '@/components/custom/collection/ProductCard';
import Sidebar from './Sidebar';
import Sorting from './collection-heading/Sorting';

export default function CollectionContent({
  collection,
  products,
  productsAll,
}: {
  collection: CollectionType;
  products: { node: ProductType }[];
  productsAll: { node: ProductType; cursor?: string | undefined }[];
}) {
  const isNew = isItemNew(products[0]?.node.publishedAt);
  const [selected, setSelected] = useState('default');

  return (
    <div className="z-0 relative pt-64 md:pt-[22rem]">
      <Banner
        description={collection.data.collectionByHandle.description}
        image={collection.data.collectionByHandle?.image?.url}
        title={collection.data.collectionByHandle.title}
      />

      <div className="bg-white rounded-t-3xl px-2 py-6 md:p-6 md:px-8 relative z-10">
        <div className="w-full flex justify-between items-center mb-4 px-2 md:mb-8 font-heading text-slate-700">
          <p>
            Showing {products.length} from {products.length}
          </p>

          <Sorting
            products={products}
            collectionHandle={collection.data.collectionByHandle.handle}
            selected={selected}
            setSelected={setSelected}
          />
        </div>

        <div className="flex flex-wrap gap-5">
          <Sidebar
            collectionHandle={collection.data.collectionByHandle.handle}
            productsAll={productsAll}
            setSelected={setSelected}
          />

          <main className="flex-1">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-3">
              {products.map((product) => (
                <ProductCard
                  key={product.node?.id}
                  imageFirst={product.node?.images?.edges?.[0]?.node.url}
                  imageSecond={product.node?.images?.edges?.[1]?.node?.url}
                  link={product.node?.handle}
                  price={product.node?.priceRange.minVariantPrice}
                  title={product.node?.title}
                  isNew={isNew}
                />
              ))}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
