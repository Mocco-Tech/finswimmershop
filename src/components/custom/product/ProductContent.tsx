'use client';

import { useProduct } from '@shopify/hydrogen-react';
import React from 'react';

import ImageGallery from './ImageGallery';
import ProductDetails from './ProductDetails';
import ProductCard from '../collection/ProductCard';
import { ExtendetProduct } from '@/types/RelatedProduct';

export default function ProductContent() {
  const productData = useProduct();
  const { options, selectedVariant, setSelectedOption } = productData;
  const product = productData.product as ExtendetProduct;

  return (
    <div className="md:p-4">
      <div className="bg-slate-100 w-full h-fit p-2 md:p-4 rounded-t-none rounded-b-2xl sm:rounded-2xl flex flex-col lg:flex-row items-start gap-5">
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
      {product?.relatedProducts?.references.edges.length > 0 && (
        <div className="mt-10 px-3">
          <h3 className="uppercase font-heading text-2xl tracking-wide text-slate-700 mb-4">
            You may also like
          </h3>
          <div className="w-full flex gap-3 overflow-x-auto no-scrollbar">
            {product?.relatedProducts?.references?.edges?.map((product) => (
              <div
                key={product.node.id}
                className="w-1/2 lg:w-1/4 flex-shrink-0"
              >
                <ProductCard
                  price={product.node.priceRange.minVariantPrice}
                  title={product.node.title}
                  link={`${product.node.handle}`}
                  imageFirst={product.node.images.edges?.[0]?.node?.url}
                  imageSecond={product.node.images.edges?.[1]?.node?.url}
                  oldPrice={product.node.compareAtPrice}
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
