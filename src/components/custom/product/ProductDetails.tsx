'use client';
import React, { useState } from 'react';
import { toast } from 'sonner';
import { AddToCartButton, Money } from '@shopify/hydrogen-react';

import { buttonVariants } from '@/components/ui/button';
import ProductOptions from './ProductOptions';
import AccordionSection from './product-details/AccordionSection';

import { ProductType } from '@/types/ProductType';
import { SelectedVariantType } from '@/types/SelectedVariantType';

type SelectedAttributes = { key: string; value: string };

interface Props {
  product: ProductType;
  selectedVariant: SelectedVariantType;
  setSelectedOption: (name: string, value: string) => void;
  options?: any;
}

export default function ProductDetails({
  product,
  selectedVariant,
  setSelectedOption,
  options,
}: Props) {
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
                  <ProductOptions
                    key={select?.key}
                    // @ts-ignore
                    values={select?.references?.edges!}
                    type="metafields"
                    handleSelect={handleSelect}
                    selectedKey={select?.key}
                  />
                )
            )}

            {options.length > 0 &&
              product?.variants?.edges?.length > 1 &&
              options?.map(
                ({ name, values }: { name: string; values: string[] }) => (
                  <ProductOptions
                    key={name}
                    name={name}
                    values={values}
                    type="options"
                    setSelectedOption={setSelectedOption}
                  />
                )
              )}
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
