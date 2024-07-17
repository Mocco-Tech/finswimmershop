'use client';

import React, { useState } from 'react';
import { ProductType } from '@/types/ProductType';
import ProductCard from '../collection/ProductCard';
import Sorting from '../collection/collection-heading/Sorting';
import Sidebar from '../collection/Sidebar';
import { isItemNew } from '@/lib/helpers';
import Banner from '../collection/banner-section/Banner';
import Pagination from '../collection/Pagination';
import { PER_PAGE } from '@/lib/consts';

export default function ShopContent({
  products,
  productsAll,
  end,
}: {
  products: { node: ProductType }[];
  productsAll: { node: ProductType }[];
  end: number;
}) {
  const isNew = isItemNew(products[0]?.node.publishedAt);
  const [selected, setSelected] = useState('default');

  return (
    <div className="z-0 relative pt-64 md:pt-[22rem]">
      <Banner description="Some shop description" title="Shop" />

      <div className="bg-white rounded-t-3xl px-3 py-6 md:p-6 md:px-8 relative z-10">
        <div className="w-full flex justify-between items-center mb-4 px-2 md:mb-8 font-heading text-slate-700">
          <p>
            Showing {products.length} from {products.length}
          </p>

          <Sorting
            products={products}
            selected={selected}
            setSelected={setSelected}
          />
        </div>

        <div className="flex flex-wrap gap-5">
          <Sidebar productsAll={productsAll} setSelected={setSelected} />

          <main className="flex-1">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-3 mb-12">
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
            <Pagination lastPage={Math.ceil(productsAll.length / PER_PAGE)} />
          </main>
        </div>
      </div>
    </div>
  );
}
