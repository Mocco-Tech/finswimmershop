import Link from 'next/link';
import React from 'react';

export default function BreadCrumbs({
  collectionTitle,
}: {
  collectionTitle: string;
}) {
  return (
    <p className="text-slate-100 text-sm font-heading font-light z-10">
      <Link
        href="/"
        className="hover:underline hover:text-slate-50 duration-150"
      >
        Home
      </Link>{' '}
      /{' '}
      <Link
        href="/shop"
        className="hover:underline hover:text-slate-50 duration-150"
      >
        Shop
      </Link>{' '}
      {collectionTitle !== 'Shop' ? `/ ${collectionTitle}` : ''}
    </p>
  );
}
