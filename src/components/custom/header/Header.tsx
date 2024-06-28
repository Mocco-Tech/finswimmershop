import React from 'react';

import CartHeaderItem from './cart/CartHeaderItem';

export default function Header() {
  return (
    <header className="h-16 px-2 lg:px-8 border-b flex items-center gap-6 w-full">
      <div className="lg:flex-1 flex justify-between gap-3 items-center w-full">
        <h1 className="font-bold uppercase text-2xl italic text-slate-700">
          Finswimmershop
        </h1>

        <div className="flex items-center gap-3">
          <CartHeaderItem />
        </div>
      </div>
    </header>
  );
}
