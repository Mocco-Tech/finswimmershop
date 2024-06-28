import React from 'react';
import Image from 'next/image';
import { Money } from '@shopify/hydrogen-react';
import { CartLine } from '@shopify/hydrogen-react/storefront-api-types';

import DeleteItemBtn from './DeleteItemBtn';
import CartQtyButtons from './CartQtyButtons';

export default function CartItem({ line }: { line: CartLine }) {
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
        <div className="w-full flex flex-col gap-1">
          <p className="text-slate-700 text-sm">
            {line?.merchandise?.product?.title}
          </p>
          <p className="text-sm text-slate-500">
            {line?.merchandise?.selectedOptions?.map((option, index) => (
              <span key={option?.name}>
                {index ? ' / ' : ''}
                {option?.value}
              </span>
            ))}
          </p>
          <Money
            className="mt-1 font-medium text-slate-700"
            data={line?.cost?.totalAmount!}
          />

          <div className="mt-4 flex justify-between items-center">
            <DeleteItemBtn />
            <CartQtyButtons quantity={line?.quantity!} />
          </div>
        </div>
      </div>
    </div>
  );
}
