'use client';
import React, { useState } from 'react';
import { CollectionType } from '@/types/CollectionType';
import { ProductType } from '@/types/ProductType';
import { isItemNew } from '@/lib/helpers';
import Banner from './banner-section/Banner';
import ProductCard from '@/components/custom/collection/ProductCard';
import Sidebar from './Sidebar';
import Sorting from './collection-heading/Sorting';
import { Button, buttonVariants } from '@/components/ui/button';
import Link from 'next/link';
import Pagination from './Pagination';
import { PER_PAGE } from '@/lib/consts';

export default function CollectionContent({
  collection,
  products,
  productsAll,
  end,
}: {
  collection: CollectionType;
  products: { node: ProductType; cursor?: string }[];
  productsAll: { node: ProductType; cursor?: string | undefined }[];
  end: number;
}) {
  const isNew = isItemNew(products[0]?.node.publishedAt);
  const [selected, setSelected] = useState('default');
  const [isShownFilters, setIsShownFilters] = useState(false);

  return (
    <div className="z-0 relative pt-64 md:pt-[22rem]">
      <Banner
        description={collection.data.collectionByHandle.description}
        image={collection.data.collectionByHandle?.image?.url}
        title={collection.data.collectionByHandle.title}
      />

      <div className="bg-white rounded-t-3xl px-3 py-6 md:p-6 md:px-8 relative z-10">
        {products.length > 0 ? (
          <div className="w-full flex justify-between items-center mb-4 px-2 md:mb-8 font-heading text-slate-700">
            <div className="flex flex-row items-center gap-5">
              <Button
                onClick={() => setIsShownFilters((cur) => !cur)}
                className="rounded-lg"
              >
                {isShownFilters ? 'Hide filters' : 'Show filters'}
              </Button>
              <p className="hidden md:inline">
                All products: {productsAll.length}
              </p>
            </div>

            <Sorting
              products={products}
              collectionHandle={collection.data.collectionByHandle.handle}
              selected={selected}
              setSelected={setSelected}
            />
          </div>
        ) : null}

        {products.length > 0 ? (
          <div className="flex flex-wrap gap-5">
            {isShownFilters && (
              <Sidebar
                collectionHandle={collection.data.collectionByHandle.handle}
                productsAll={productsAll}
                setSelected={setSelected}
              />
            )}

            <main className="flex-1">
              <div
                className={`grid grid-cols-2 gap-3 md:gap-5 mb-12 ${
                  isShownFilters ? 'md:grid-cols-3' : 'md:grid-cols-4'
                }`}
              >
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

              {products.length !== productsAll.length && (
                <Pagination
                  handle={collection.data.collectionByHandle.handle}
                  lastPage={Math.ceil(productsAll.length / PER_PAGE)}
                />
              )}
            </main>
          </div>
        ) : (
          <div className="py-10 flex items-start md:items-center justify-center flex-col text-slate-500">
            <p className="mb-1">
              We&apos;re sorry, but this category is still empty.
            </p>
            <p className="mb-3">
              Come back and browse the new products very soon
            </p>
            <Link href="/shop" className={buttonVariants()}>
              Shop all
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
