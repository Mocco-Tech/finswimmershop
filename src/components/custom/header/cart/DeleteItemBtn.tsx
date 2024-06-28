import React from 'react';
import { RiDeleteBin5Line } from 'react-icons/ri';
import { CartLineQuantityAdjustButton } from '@shopify/hydrogen-react';
import { toast } from 'sonner';

export default function DeleteItemBtn() {
  return (
    <CartLineQuantityAdjustButton
      className="p-2 rounded-full bg-slate-100/80 hover:bg-slate-200/80 text-slate-500/80 text-md duration-150"
      adjust="remove"
      onClick={() => {
        toast('Item deleted form the cart');
      }}
    >
      <RiDeleteBin5Line className="text-light" />
    </CartLineQuantityAdjustButton>
  );
}
