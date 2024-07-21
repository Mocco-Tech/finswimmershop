import React from 'react';

import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function Pagination({
  handle,
  lastPage,
}: {
  handle?: string;
  lastPage: number;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const brand = searchParams.get('brand');
  const page = searchParams.get('page') ?? '1';

  const isFirstPage = Number(page) === 1;
  const isLastPage = Number(page) === lastPage;

  const prevPageFn = () => {
    handle
      ? router.push(
          `/collections/${handle}/?${brand ? `brand=${brand}&` : ''}page=${
            Number(page) - 1
          }`
        )
      : router.push(
          `/shop/?${brand ? `brand=${brand}&` : ''}page=${Number(page) - 1}`
        );
  };
  const nextPageFn = () => {
    handle
      ? router.push(
          `/collections/${handle}/?${brand ? `brand=${brand}&` : ''}page=${
            Number(page) + 1
          }`
        )
      : router.push(
          `/shop/?${brand ? `brand=${brand}&` : ''}page=${Number(page) + 1}`
        );
  };
  const firstPageFn = () => {
    handle
      ? router.push(
          `/collections/${handle}/?${brand ? `brand=${brand}&` : ''}page=1`
        )
      : router.push(`/shop/?${brand ? `brand=${brand}&` : ''}page=1`);
  };
  const lastPageFn = () => {
    handle
      ? router.push(
          `/collections/${handle}/?${
            brand ? `brand=${brand}&` : ''
          }page=${lastPage}`
        )
      : router.push(`/shop/?${brand ? `brand=${brand}&` : ''}page=${lastPage}`);
  };

  return (
    <div className="flex gap-1 items-center justify-center">
      {!isFirstPage && (
        <Button onClick={() => prevPageFn()} variant={'ghost'}>
          <ChevronLeft strokeWidth={1.25} className="w-fit" />{' '}
          <span className="hidden md:inline">Previous</span>
        </Button>
      )}

      {!isFirstPage && (
        <Button
          variant={'outline'}
          className="!disabled:text-slate-700"
          onClick={() => firstPageFn()}
        >
          1
        </Button>
      )}

      {!isFirstPage && <span className="px-4 h-10 text-xl">...</span>}

      <Button variant={'outline'} disabled className="!disabled:text-slate-700">
        {page}
      </Button>

      {!isLastPage && <span className="px-4 h-10 text-xl">...</span>}

      {!isLastPage && (
        <Button variant={'ghost'} onClick={() => lastPageFn()}>
          {lastPage}
        </Button>
      )}

      {!isLastPage && (
        <Button onClick={() => nextPageFn()} variant={'ghost'}>
          <span className="hidden md:inline">Next</span>{' '}
          <ChevronRight strokeWidth={1.25} className="w-fit" />
        </Button>
      )}
    </div>
  );
}
