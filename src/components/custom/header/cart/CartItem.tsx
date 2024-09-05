import React from 'react';
import Image from 'next/image';
import { Money } from '@shopify/hydrogen-react';
import { CartLine } from '@shopify/hydrogen-react/storefront-api-types';

import DeleteItemBtn from './DeleteItemBtn';
import CartQtyButtons from './CartQtyButtons';
import { useCurrencyContext } from '@/contexts/CurrencyContext';
import { changePriceCurrency } from '@/lib/helpers';

export default function CartItem({ line }: { line: CartLine }) {
  const { currency } = useCurrencyContext();
  const newPrice = changePriceCurrency(line?.cost?.totalAmount, currency);

  return (
    <div className="border-b border-slate-200 pb-5">
      <div className="flex items-start gap-3">
        <div className="h-24 w-24 shrink-0 overflow-hidden rounded-md border border-slate-200">
          <Image
            src={line?.merchandise?.image?.url! || '/no-image.webp'}
            alt={line?.merchandise?.image?.altText || line?.merchandise?.title}
            width={line?.merchandise?.image?.width! || 400}
            height={line?.merchandise?.image?.height! || 400}
            className="h-full w-full object-cover object-center"
          />
        </div>
        <div className="w-full flex flex-col">
          <p className="text-slate-700 text-sm mb-1">
            {line?.merchandise?.product?.title}
          </p>
          <p className="text-sm text-slate-500">
            {line?.merchandise?.selectedOptions?.map(
              (option, index) =>
                option?.name !== 'Title' && (
                  <span key={option?.name}>
                    {option?.value}
                    {index ? ' / ' : ''}
                  </span>
                )
            )}
            {line?.attributes?.map(
              (option, index) =>
                option?.key !== 'Title' && (
                  <span key={option?.key}>
                    {option?.value}
                    {index || line?.merchandise?.selectedOptions.length > 0
                      ? ' / '
                      : ''}
                  </span>
                )
            )}
          </p>

          {/* @ts-ignore */}
          <Money className="mt-1 font-medium text-slate-700" data={newPrice} />

          <div className="mt-4 flex justify-between items-center">
            <DeleteItemBtn />
            <CartQtyButtons quantity={line?.quantity!} />
          </div>
        </div>
      </div>
    </div>
  );
}
