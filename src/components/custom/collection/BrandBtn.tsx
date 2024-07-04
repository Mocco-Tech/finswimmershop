'use client';

import React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

interface Props {
  brand: { name: string; handle: string };
  collectionHandle?: string;
  sortBy: string | null;
  setSelected: React.Dispatch<React.SetStateAction<string>>;
}

export default function BrandBtn({
  brand,
  collectionHandle,
  sortBy,
  setSelected,
}: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();

  function handleClick() {
    setSelected('default');
    collectionHandle !== undefined
      ? router.push(`/collections/${collectionHandle}?brand=${brand.handle}`, {
          scroll: false,
        })
      : router.push(`/shop?brand=${brand.handle}`, {
          scroll: false,
        });
  }

  return (
    <button
      key={brand.handle}
      onClick={() => handleClick()}
      className={`border border-slate-200 px-2 py-2 rounded-lg hover:border-slate-500 duration-150 ${
        searchParams.get('brand') === brand.handle
          ? 'bg-slate-700 text-slate-50'
          : 'bg-transparent'
      }`}
    >
      {brand.name}
    </button>
  );
}
