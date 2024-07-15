'use client';
import React, { useState } from 'react';
import { AddToCartButton, Money } from '@shopify/hydrogen-react';
import { toast } from 'sonner';
import { buttonVariants } from '@/components/ui/button';
import AccordionSection from './product-details/AccordionSection';
import { ProductType } from '@/types/ProductType';
import {
  MetafieldReference,
  Metaobject,
} from '@shopify/hydrogen-react/storefront-api-types';

type SelectedVariantType = {
  id: string;
  title: string;
  price: { amount: string; currencyCode: string };
  selectedOptions: { name: string; value: string }[];
};

type SelectedAttributes = { key: string; value: string };

export default function ProductDetails({
  product,
  selectedVariant,
  setSelectedOption,
  options,
}: {
  product: ProductType;
  selectedVariant: SelectedVariantType;
  setSelectedOption: (name: string, value: string) => void;
  options?: any;
}) {
  const price = product?.variants?.edges?.[0]?.node?.price;

  const [selecteAttributes, setSelecteAttributes] = useState<
    SelectedAttributes[]
  >([]);

  function handleSelect(selectedKey: string, selectedValue: string) {
    let currentAttribute: { key: string; value: string } = {
      key: selectedKey,
      value: selectedValue,
    };

    setSelecteAttributes((currentAttributes) =>
      currentAttributes.length === 0 ||
      !currentAttributes.some(
        (attribute) => attribute.key === currentAttribute.key
      )
        ? [...currentAttributes, currentAttribute]
        : [
            ...currentAttributes.map((a) =>
              a.key === currentAttribute.key
                ? { ...a, value: currentAttribute.value }
                : a
            ),
          ]
    );
  }

  return (
    <div
      className={`bg-white rounded-xl p-4 lg:p-6 self-start w-full lg:w-1/2 flex flex-col justify-between ${
        options.length > 1 ? 'lg:min-h-[680px]' : 'lg:min-h-fit'
      }`}
    >
      <div className="mb-4">
        <h1 className="text-slate-700 font-heading text-2xl font-normal mb-2">
          {product?.title}
        </h1>

        <h2 className="uppercase font-medium text-slate-600/90 tracking-tight mb-3">
          {product?.collections?.edges?.[0]?.node?.title}
        </h2>

        {product?.metafields.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 gap-5">
            {product?.metafields.map(
              (select) =>
                select && (
                  <div
                    key={select?.key}
                    className="w-full flex flex-col justify-between items-start gap-1"
                  >
                    <label className="text-slate-600/80 text-xs capitalize">
                      {/* @ts-ignore */}
                      Select {select?.references?.edges[0].node.type}
                    </label>
                    <select
                      onChange={(e) => handleSelect(select.key, e.target.value)}
                      className="flex-1 w-full appearance-none border border-slate-200 rounded px-3 py-1 text-slate-600 font-light outline-none focus:ring-2 focus:ring-slate-700  duration-150"
                      defaultValue="DEFAULT"
                    >
                      <option value="DEFAULT" disabled>
                        Select option
                      </option>
                      {select?.references?.edges.map((option) => (
                        <option
                          // @ts-ignore
                          key={option.node.handle}
                          // @ts-ignore
                          value={option.node.fields[0].value}
                        >
                          {/* @ts-ignore */}
                          {option.node.fields[0].value}
                        </option>
                      ))}
                    </select>
                  </div>
                )
            )}

            {/*  */}
            {options.length > 0 &&
              product?.variants?.edges?.length > 1 &&
              options?.map(
                ({ name, values }: { name: string; values: string[] }) => (
                  <div
                    key={name}
                    className="w-full flex flex-col justify-between items-start gap-1"
                  >
                    <label className="text-slate-600/80 text-xs">
                      Select {name}
                    </label>
                    <select
                      name={name}
                      id={name}
                      className="flex-1 w-full appearance-none border border-slate-200 rounded px-3 py-1 text-slate-600 font-light outline-none focus:ring-2 focus:ring-slate-700  duration-150"
                      onChange={(e) => setSelectedOption(name, e.target.value)}
                      defaultValue={'DEFAULT'}
                    >
                      <option value="DEFAULT" disabled>
                        Select option
                      </option>
                      {values.map((value: string) => {
                        return (
                          <option key={value} value={value}>
                            {value}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                )
              )}
            {/*  */}
          </div>
        )}
      </div>

      <div>
        <div className="border-t border-slate-100 py-4 text-slate-600 flex items-center gap-5">
          {/* @ts-ignore */}
          <Money data={selectedVariant ? selectedVariant?.price! : price!} />
        </div>

        <AddToCartButton
          variantId={selectedVariant?.id}
          attributes={selecteAttributes}
          className={buttonVariants({
            className: 'w-full',
          })}
          onClick={() => {
            toast.success(`${product?.title} added to the cart`);
          }}
          disabled={selecteAttributes.length !== product?.metafields.length}
        >
          Add to cart
        </AddToCartButton>

        <AccordionSection
          description={product?.descriptionHtml?.toString()}
          deliveryTime={product?.deliveryTime?.value}
          manufacturingTime={product?.manufacturingTime?.value}
        />
      </div>
    </div>
  );
}
