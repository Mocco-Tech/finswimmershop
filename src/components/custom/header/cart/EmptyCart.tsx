import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { buttonVariants } from '@/components/ui/button';
import { SheetClose } from '@/components/ui/sheet';

export default function EmptyCart() {
  return (
    <div className="flex flex-col justify-center items-center gap-5 px-4 h-full">
      <Image
        src="/empty-cart.png"
        alt="Empty cart image"
        width={512}
        height={512}
        className="w-32"
      />
      <div className="text-center">
        <p className="font-heading font-medium text-xl text-slate-700">
          Your cart is empty
        </p>
        <p className="text-slate-500 text-sm font-medium">
          There are no products in your cart
        </p>
      </div>
      <SheetClose asChild>
        <Link href="/shop" className={buttonVariants({ className: 'w-full' })}>
          Shop all
        </Link>
      </SheetClose>
    </div>
  );
}
