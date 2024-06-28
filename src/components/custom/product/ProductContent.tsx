'use client';

import { Money, useProduct } from '@shopify/hydrogen-react';
import React, { useContext } from 'react';

import ImageGallery from './ImageGallery';
import ProductDetails from './ProductDetails';
import { RelatedProductsContext } from './ProductDataProvider';
import Image from 'next/image';
import Link from 'next/link';

export default function ProductContent() {
  const { product, options, selectedVariant, setSelectedOption } = useProduct();

  const relatedProducts = useContext(RelatedProductsContext);

  return (
    <div className="md:p-4">
      <div className="bg-slate-100 w-full h-fit p-2 md:p-4 rounded-t-none rounded-b-2xl sm:rounded-2xl  flex flex-col md:flex-row items-end gap-5">
        <ImageGallery
          //  @ts-ignore
          images={product?.images?.edges!}
          productTitle={product?.title!}
        />

        <ProductDetails
          //  @ts-ignore
          product={product}
          options={options}
          //  @ts-ignore
          selectedVariant={selectedVariant}
          setSelectedOption={setSelectedOption}
        />
      </div>
      <div className="mt-10 px-2">
        <h3 className="uppercase font-heading text-2xl tracking-wide text-slate-700 mb-4">
          You may also like
        </h3>
        <div className="w-full flex gap-3 overflow-x-auto no-scrollbar">
          {relatedProducts?.map((product) => {
            return (
              <Link
                href={`/product/${product.handle}`}
                key={product.id}
                className="block w-1/2 lg:w-1/4 flex-shrink-0 bg-slate-50 rounded-lg p-2 lg:p-4"
              >
                <Image
                  src={product.images.edges?.[0].node.url}
                  alt={product.title}
                  width={500}
                  height={500}
                  className="w-full rounded-md mb-2"
                />
                <h4 className="underline text-slate-600 mb-2">
                  {product.title}
                </h4>
                <Money
                  data={product.priceRange.minVariantPrice}
                  className="text-slate-600"
                />
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
