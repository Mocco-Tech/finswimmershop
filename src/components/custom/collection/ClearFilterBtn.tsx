'use client';

import React from 'react';
import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from 'next/navigation';
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
  const pathname = usePathname();
  const brand = searchParams.get('brand');

  if (searchParams.size > 0 && brand)
    return (
      <button
        onClick={() => {
          setSelected('default');
          pathname === '/shop'
            ? router.push('/shop', { scroll: false })
            : router.push(`/collections/${collectionHandle}`, {
                scroll: false,
              });
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
