import React from 'react';
import { ShoppingBag } from 'lucide-react';

export default function CartBtn({ cartQty }: { cartQty: number }) {
  return (
    <>
      <div className="hidden md:flex w-auto sm:w-24 h-9 bg-slate-700 rounded-full items-center justify-between px-3 pr-1">
        <p className="hidden sm:block font-heading text-slate-50 font-light">
          Cart
        </p>
        <p className="w-7 h-7 bg-slate-50 rounded-full text-slate-700 flex items-center justify-center text-md">
          {cartQty}
        </p>
      </div>
      <div className="md:hidden relative rounded-full border h-8 w-8 flex items-center justify-center border-slate-700">
        <ShoppingBag strokeWidth={1} className="w-5" />
        <span className="absolute -top-2 -right-2 text-sm bg-slate-700 text-slate-50 rounded-full w-5 h-5">
          {cartQty}
        </span>
      </div>
    </>
  );
}
