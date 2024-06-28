import React from 'react';
import { Product } from '@shopify/hydrogen-react/storefront-api-types';
import { AddToCartButton, Money } from '@shopify/hydrogen-react';
import { toast } from 'sonner';
import { buttonVariants } from '@/components/ui/button';
import AccordionSection from './product-details/AccordionSection';
import OptionsSelection from './product-details/OptionsSelection';

type SelectedVariantType = {
  id: string;
  title: string;
  price: { amount: string; currencyCode: string };
  selectedOptions: { name: string; value: 'XS' }[];
};
export default function ProductDetails({
  product,
  selectedVariant,
  setSelectedOption,
  options,
}: {
  product: Product;
  selectedVariant: SelectedVariantType;
  setSelectedOption: (name: string, value: string) => void;
  options?: any;
}) {
  const price = product?.variants?.edges?.[0]?.node?.price;

  return (
    <div
      className={`bg-white rounded-xl p-4 lg:p-6 self-start w-full lg:w-1/2 flex flex-col justify-between ${
        options.length > 1 ? 'lg:min-h-[680px]' : 'lg:min-h-fit'
      }`}
    >
      <div className="">
        <h1 className="text-slate-700 font-heading text-2xl font-normal mb-2">
          {product?.title}
        </h1>

        <h2 className="uppercase font-medium text-slate-600/90 tracking-tight mb-3">
          {product?.collections?.edges?.[0]?.node?.title}
        </h2>

        {options.length > 1 && (
          <OptionsSelection
            options={options}
            setSelectedOption={setSelectedOption}
          />
        )}
      </div>

      <div>
        <div className="border-t border-slate-100 py-4 text-slate-600 flex items-center gap-5">
          {/* @ts-ignore */}
          <Money data={selectedVariant ? selectedVariant?.price! : price!} />
        </div>

        <AddToCartButton
          variantId={selectedVariant?.id}
          disabled={!selectedVariant?.id}
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
          description={product?.description}
          // @ts-ignore
          deliveryTime={product?.deliveryTime?.value}
          // @ts-ignore
          manufacturingTime={product?.manufacturingTime?.value}
        />
      </div>
    </div>
  );
}
