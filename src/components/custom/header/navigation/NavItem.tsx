import Link from 'next/link';
import React, { ReactNode } from 'react';

export default function NavItem({
  children,
  link,
}: {
  children: ReactNode;
  link: string;
}) {
  return (
    <Link
      href={link}
      className="block px-4 py-2 hover:bg-slate-50 text-slate-700"
    >
      {children}
    </Link>
  );
}
