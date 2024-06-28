import React from 'react';
import Link from 'next/link';
import { CartCost } from '@shopify/hydrogen-react';
import { HiOutlineShoppingBag } from 'react-icons/hi2';
import { buttonVariants } from '@/components/ui/button';

export default function CartSubtotal({ checkoutUrl }: { checkoutUrl: string }) {
  return (
    <div className="shadow-custom px-4 pt-2 ">
      <div className="flex justify-between items-center mb-4 text-slate-700 font-heading">
        <div>
          <p className="text-lg">Subtotal:</p>
          <p className="text-sm font-body text-slate-400">
            Shipping calculated at checkout.
          </p>
        </div>
        <CartCost amountType="subtotal" />
      </div>
      <Link
        href={checkoutUrl}
        className={buttonVariants({
          className: 'w-full h-12 rounded-lg',
        })}
      >
        <HiOutlineShoppingBag className="mr-2 font-medium" />
        Checkout securely
      </Link>
    </div>
  );
}
