import React from 'react';
import { CartLineQuantityAdjustButton } from '@shopify/hydrogen-react';

export default function CartQtyButtons({ quantity }: { quantity: number }) {
  return (
    <div className="flex items-center gap-2">
      <CartLineQuantityAdjustButton
        className="w-7 h-7 rounded-md flex items-center justify-center bg-slate-100/80 hover:bg-slate-200/80 text-slate-500 text-md duration-150"
        adjust="decrease"
      >
        -
      </CartLineQuantityAdjustButton>
      <p className="text-sm text-slate-700">Qty: {quantity}</p>
      <CartLineQuantityAdjustButton
        className="w-7 h-7 rounded-md flex items-center justify-center bg-slate-100/80 hover:bg-slate-200/80 text-slate-500 text-md duration-150"
        adjust="increase"
      >
        +
      </CartLineQuantityAdjustButton>
    </div>
  );
}
