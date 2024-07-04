import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { ProductType } from '@/types/ProductType';
import BrandFilter from './collection-sidebar/BrandFilter';

type Props = {
  products: {
    node: ProductType;
  }[];
  setFiltered: React.Dispatch<
    React.SetStateAction<
      {
        node: ProductType;
      }[]
    >
  >;
  setSorted: React.Dispatch<
    React.SetStateAction<
      {
        node: ProductType;
      }[]
    >
  >;
};

export default function CollectionSidebar({
  products,
  setFiltered,
  setSorted,
}: Props) {
  let brandsObj: { name: string; qty: number }[] = [];
  products.map((product) => {
    const productBrand =
      product?.node?.brand?.references?.edges[0]?.node.fields[0].value;

    if (productBrand !== undefined) {
      if (brandsObj.length <= 0) {
        brandsObj.push({ name: productBrand, qty: 1 });
      } else if (brandsObj.find((e) => e.name === productBrand)) {
        brandsObj.find((e) => (e.name === productBrand ? (e.qty += 1) : null));
      } else if (brandsObj.find((e) => e.name !== productBrand)) {
        brandsObj.push({ name: productBrand, qty: 1 });
      }
    }
  });

  if (brandsObj.length > 0)
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
              <BrandFilter
                brandsObj={brandsObj}
                products={products}
                setFiltered={setFiltered}
                setSorted={setSorted}
              />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </aside>
    );
}
