'use client';

import React, { useState } from 'react';
import { Money } from '@shopify/hydrogen-react';
import Image from 'next/image';
import Link from 'next/link';

export default function ProductCard({
  link,
  imageFirst,
  imageSecond,
  title,
  price,
  isNew,
}: {
  link: string;
  imageFirst: string;
  imageSecond?: string;
  title: string;
  price: { amount: string; currencyCode: string };
  isNew?: boolean;
}) {
  const [currentImage, setCurrentImage] = useState(imageFirst);

  return (
    <Link
      href={`/product/${link}`}
      className="block flex-shrink-0 rounded-lg relative"
      onMouseEnter={() =>
        imageSecond ? setCurrentImage(imageSecond) : imageFirst
      }
      onMouseLeave={() =>
        imageSecond ? setCurrentImage(imageFirst) : imageFirst
      }
    >
      <span className="bg-slate-50 absolute top-1 left-1 lg:top-2 lg:left-2 block w-fit px-4 py-1 border border-slate-600 rounded-lg text-sm font-heading text-slate-600/90">
        New
      </span>
      <Image
        src={currentImage ? currentImage : '/no-image.webp'}
        alt={`${title} image`}
        width={500}
        height={500}
        className="w-full object-cover rounded-md mb-2"
      />
      <h4 className="underline text-slate-600 mb-2">{title}</h4>
      {/* @ts-ignore */}
      <Money data={price} className="text-slate-600" />
    </Link>
  );
}
