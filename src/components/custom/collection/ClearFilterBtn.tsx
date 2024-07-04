'use client';

import React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { cn } from '@/lib/utils';

export default function ClearFilterBtn({
  collectionHandle,
  className,
  setSelected,
}: {
  collectionHandle?: string;
  className?: string;
  setSelected: React.Dispatch<React.SetStateAction<string>>;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  if (searchParams.size > 0)
    return (
      <button
        onClick={() => {
          setSelected('default');
          collectionHandle !== undefined
            ? router.push(`/collections/${collectionHandle}`, { scroll: false })
            : router.push('/shop', { scroll: false });
        }}
        className={cn(
          'underline text-slate-400 hover:text-slate-700 duration-150',
          className
        )}
      >
        Clear filter
      </button>
    );
}
