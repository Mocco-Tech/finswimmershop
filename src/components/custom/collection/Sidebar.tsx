'use client';
import React from 'react';

import { ProductType } from '@/types/ProductType';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import BrandBtn from './BrandBtn';
import ClearFilterBtn from './ClearFilterBtn';
import { useSearchParams } from 'next/navigation';
import { getBrands } from '@/lib/helpers';

interface Props {
  collectionHandle?: string;
  productsAll: { node: ProductType; cursor?: string | undefined }[];
  setSelected: React.Dispatch<React.SetStateAction<string>>;
}

export default function Sidebar({
  collectionHandle,
  productsAll,
  setSelected,
}: Props) {
  const searchPrams = useSearchParams();
  const sortBy = searchPrams.get('sortBy');

  const brands = getBrands(productsAll!);

  return (
    <aside className="w-full md:w-1/5 h-fit bg-slate-50 rounded-xl p-6">
      <h3 className="text-slate-700 font-heading font-medium text-xl">
        Filter and sort
      </h3>
      <Accordion type="multiple" defaultValue={['item-1']}>
        <AccordionItem value="item-1">
          <AccordionTrigger className="text-slate-700 font-heading font-normal">
            Brand
          </AccordionTrigger>
          <AccordionContent className="text-slate-500">
            <div className="flex flex-col gap-[6px]">
              {brands.map((brand) => (
                <BrandBtn
                  key={brand.handle}
                  brand={brand}
                  collectionHandle={collectionHandle}
                  sortBy={sortBy}
                  setSelected={setSelected}
                />
              ))}

              <ClearFilterBtn
                collectionHandle={collectionHandle}
                className="mt-2"
                setSelected={setSelected}
              />
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </aside>
  );
}
