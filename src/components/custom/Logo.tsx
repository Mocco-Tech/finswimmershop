import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function Logo() {
  return (
    <Link href="/" className="block max-w-80 w-full">
      <Image
        src="/finswimmershop-logo.svg"
        alt="Finswimmershop.com logo"
        width={300}
        height={100}
        className="w-full object-cover"
      />
    </Link>
  );
}
