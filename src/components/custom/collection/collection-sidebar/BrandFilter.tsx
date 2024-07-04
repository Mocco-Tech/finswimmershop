import React, { useState } from 'react';
import { ProductType } from '@/types/ProductType';

type Props = {
  products: {
    node: ProductType;
  }[];
  brandsObj: { name: string; qty: number }[];
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

export default function BrandFilter({
  products,
  brandsObj,
  setFiltered,
  setSorted,
}: Props) {
  const [checked, setChecked] = useState('');
  function filterProducts(filterValue: string) {
    setFiltered(
      products.filter(
        (product) =>
          product?.node?.brand?.references?.edges[0]?.node.fields[0].value ===
          filterValue
      )
    );
    setSorted(
      products.filter(
        (product) =>
          product?.node?.brand?.references?.edges[0]?.node.fields[0].value ===
          filterValue
      )
    );
  }

  return (
    <div className="flex flex-col gap-2">
      {brandsObj.map((brand) => {
        return (
          <div key={brand.name} className="flex items-center">
            <input
              id={brand.name}
              name="brand"
              type="radio"
              value={brand.name}
              checked={checked === brand.name}
              onChange={(e) => {
                setChecked(e.target.value);
                filterProducts(e.target.value);
              }}
              className="hidden peer"
            />
            <label
              htmlFor={brand.name}
              className="text-center cursor-pointer w-full rounded-lg border border-slate-300 duration-150 px-4 py-2 text-sm text-slate-600 hover:border-slate-600 peer-checked:bg-slate-800 peer-checked:text-slate-50 peer-checked:border-slate-800"
            >
              {brand.name}
            </label>
          </div>
        );
      })}
      {checked !== '' && (
        <button
          onClick={() => {
            setChecked('');
            setFiltered(products);
            setSorted(products);
          }}
          className="mt-2 hover:underline hover:text-slate-700 duration-150"
        >
          Clear filter
        </button>
      )}
    </div>
  );
}
