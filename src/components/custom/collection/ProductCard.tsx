'use client';

import React, { useState } from 'react';
import { Money } from '@shopify/hydrogen-react';
import Image from 'next/image';
import Link from 'next/link';
import { CurrencyCode } from '@shopify/hydrogen-react/storefront-api-types';

interface Props {
  link: string;
  imageFirst: string;
  imageSecond?: string;
  title: string;
  price: { amount: string; currencyCode: CurrencyCode };
  oldPrice?: { amount: string; currencyCode: CurrencyCode };
  isNew?: boolean;
}

export default function ProductCard({
  link,
  imageFirst,
  imageSecond,
  title,
  price,
  oldPrice,
  isNew,
}: Props) {
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
      <div className="overflow-hidden">
        <Image
          src={currentImage ? currentImage : '/no-image.webp'}
          alt={`${title} image`}
          width={500}
          height={500}
          className="w-full h-48 sm:h-64 md:h-72 lg:h-96 object-cover rounded-md mb-2"
        />
      </div>
      <h4 className="underline text-slate-600 mb-2">{title}</h4>
      <div>
        {oldPrice && <Money data={oldPrice} className="line-through" />}
        <Money
          data={price}
          className={oldPrice ? 'text-red-500' : 'text-slate-700'}
        />
      </div>
    </Link>
  );
}
