import { SheetClose } from '@/components/ui/sheet';
import { cutMenuLink } from '@/lib/helpers';
import Link from 'next/link';
import React, { ReactNode } from 'react';

export default function MobileNavLink({
  url,
  children,
}: {
  url: string;
  children: ReactNode;
}) {
  return (
    <SheetClose asChild>
      <Link
        href={cutMenuLink(url)}
        className="block px-2 py-1 hover:bg-slate-100 font-heading text-slate-700"
      >
        {children}
      </Link>
    </SheetClose>
  );
}
