'use client';

import React from 'react';
import { ProductType } from '@/types/ProductType';
import { useRouter, useSearchParams } from 'next/navigation';

interface Props {
  products: {
    node: ProductType;
  }[];
  collectionHandle?: string;
  selected: string;
  setSelected: React.Dispatch<React.SetStateAction<string>>;
}

export default function Sorting({
  collectionHandle,
  selected,
  setSelected,
}: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const brand = searchParams.get('brand');
  const page = searchParams.get('page');

  function sortProducts(key: string) {
    setSelected(key);

    collectionHandle
      ? router.push(
          `/collections/${collectionHandle}?${page ? `page=${page}&` : ''}${
            brand ? `brand=${brand}&` : ''
          }sortBy=${key}`,
          {
            scroll: false,
          }
        )
      : router.push(
          `?${page ? `page=${page}&` : ''}${
            brand ? `brand=${brand}&` : ''
          }sortBy=${key}`,
          {
            scroll: false,
          }
        );
  }

  return (
    <select
      name="sorting"
      id="sorting"
      value={selected}
      onChange={(e) => sortProducts(e.target.value)}
      className="outline-none px-2 py-1 border bg-white border-white focus:border-slate-600 focus:ring-2 focus:ring-slate-600 focus:ring-offset-2 rounded-lg duration-150"
    >
      <option value="default">Default</option>
      <option value="price_low_to_high">Price: Low to high</option>
      <option value="price_high_to_low">Price: High to low</option>
      <option value="updated_at">Latest</option>
    </select>
  );
}
