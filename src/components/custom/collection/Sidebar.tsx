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
    <aside className="bg-slate-50 w-full md:w-1/5 h-fit rounded-xl p-4 md:p-6">
      <h3 className="text-slate-700 font-heading font-medium text-xl">
        Filters
      </h3>
      <Accordion type="multiple">
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
