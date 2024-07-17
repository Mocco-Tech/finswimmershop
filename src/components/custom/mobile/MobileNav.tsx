'use client';
import React from 'react';

import { MenuType } from '@/types/MenuType';
import { House, ShoppingBag } from 'lucide-react';
import Link from 'next/link';
import MobileCategoriesMenu from './MobileCategoriesMenu';
import { SheetTrigger } from '@/components/ui/sheet';
import { CartWithActions, useCart } from '@shopify/hydrogen-react';
import SearchBtn from '../header/header-buttons/SearchBtn';

export default function MobileNav({ collections }: { collections: MenuType }) {
  const cart: CartWithActions = useCart();

  return (
    <nav className="bg-white z-30 border-t border-t-slate-200 w-full fixed bottom-0 left-0 h-12 flex items-center justify-evenly md:hidden">
      <Link
        href="/"
        className="w-1/4 h-full flex items-center justify-center border-r border-slate-200"
      >
        <House strokeWidth={1} size={20} className="text-slate-700" />
      </Link>
      <MobileCategoriesMenu collections={collections} />
      <SheetTrigger className="w-1/4 h-full flex items-center justify-center border-r border-slate-200 relative">
        <div className="absolute top-1 left-1/2 translate-x-1/5 w-5 h-5 bg-slate-700 text-slate-50 flex justify-center items-center rounded-full text-sm">
          {cart.totalQuantity!}
        </div>
        <ShoppingBag strokeWidth={1} className="w-5 text-slate-700" />
      </SheetTrigger>
      <div className="w-1/4 h-full flex items-center justify-center">
        <SearchBtn />
      </div>
    </nav>
  );
}
