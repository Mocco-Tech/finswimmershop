'use client';

import React from 'react';

import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import {
  CartLineProvider,
  CartWithActions,
  useCart,
} from '@shopify/hydrogen-react';

import CartBtn from './CartBtn';
import CartSubtotal from './CartSubtotal';
import EmptyCart from './EmptyCart';
import CartItem from './CartItem';

export default function CartHeaderItem() {
  const cart: CartWithActions = useCart();

  return (
    <Sheet>
      <SheetTrigger>
        <CartBtn cartQty={cart.totalQuantity!} />
      </SheetTrigger>
      <SheetContent className="!max-w-[30rem] w-[90%] md:w-full pt-5 h-svh flex flex-col justify-between gap-0 px-0 pb-3">
        {cart?.lines?.length! > 0 ? (
          <>
            <div className="overflow-y-scroll no-scrollbar px-4 pb-2">
              <SheetTitle className="text-center text-slate-700 mb-4">
                Your shopping cart
              </SheetTitle>
              <div className="flex flex-col gap-3">
                {cart.lines?.map((line, index) => (
                  <CartLineProvider line={line!} key={index}>
                    {/* @ts-ignore */}
                    <CartItem line={line!} />
                  </CartLineProvider>
                ))}
              </div>
            </div>
            <CartSubtotal checkoutUrl={cart.checkoutUrl!} />
          </>
        ) : (
          <>
            <SheetTitle className="text-center text-slate-700 mb-4">
              Your shopping cart
            </SheetTitle>
            <EmptyCart />
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
