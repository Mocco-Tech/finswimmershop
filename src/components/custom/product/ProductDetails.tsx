'use client';
import React, { useState } from 'react';
import { toast } from 'sonner';
import { AddToCartButton, Money } from '@shopify/hydrogen-react';

import { buttonVariants } from '@/components/ui/button';
import ProductOptions from './ProductOptions';
import AccordionSection from './product-details/AccordionSection';

import { ProductType } from '@/types/ProductType';
import { SelectedVariantType } from '@/types/SelectedVariantType';
import { useCurrencyContext } from '@/contexts/CurrencyContext';
import { changePriceCurrency } from '@/lib/helpers';

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
  const { currency } = useCurrencyContext();

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

  // console.log(product.metafields);

  const newPrice = changePriceCurrency(selectedVariant.price, currency);

  return (
    <div
      className={`bg-white rounded-xl p-4 lg:p-6 self-start w-full flex flex-col justify-between ${
        product.images.edges.length > 1 ? 'lg:w-1/2' : 'lg:w-3/5'
      } ${options.length > 1 ? 'lg:min-h-[680px]' : 'lg:min-h-fit'}`}
    >
      <div className="mb-4">
        <h1 className="text-slate-700 font-heading text-2xl font-normal mb-2">
          {product?.title}
        </h1>

        <h2 className="uppercase font-medium text-slate-600/90 tracking-tight mb-3">
          {product?.collections?.edges?.[0]?.node?.title === 'Home page'
            ? product?.collections?.edges?.[1]?.node?.title
            : product?.collections?.edges?.[0]?.node?.title}
        </h2>

        {product?.metafields.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 gap-5">
            {product?.metafields.map((select) => {
              console.log(select);
              return (
                select && (
                  <ProductOptions
                    key={select?.key}
                    name={select.key.replaceAll('_', ' ')}
                    // @ts-ignore
                    values={select?.references?.edges!}
                    type="metafields"
                    handleSelect={handleSelect}
                    selectedKey={select?.key}
                  />
                )
              );
            })}

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
        <div className="border-t border-slate-100 py-4 text-slate-600 flex items-center gap-2">
          {selectedVariant.compareAtPrice && (
            <Money
              data={selectedVariant.compareAtPrice}
              className="line-through text-lg"
            />
          )}
          <Money
            // @ts-ignore
            // data={selectedVariant ? selectedVariant?.price! : price!}
            data={newPrice}
            className={
              selectedVariant.compareAtPrice
                ? 'text-red-500 text-lg'
                : 'text-slate-700 text-lg'
            }
          />
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
          disabled={
            selecteAttributes.length !==
            product?.metafields.filter((value) => value !== null).length
          }
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
