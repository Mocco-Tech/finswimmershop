'use client';

import { useCurrencyContext } from '@/contexts/CurrencyContext';
import { changePriceCurrency } from '@/lib/helpers';
import { ProductType } from '@/types/ProductType';
import { Product } from '@shopify/hydrogen-react/storefront-api-types';
import React from 'react';

export default function StructuredData({ product }: { product: ProductType }) {
  const { currency } = useCurrencyContext();

  const productDescription = product?.seo?.description
    ? product?.seo?.description
    : product?.description;

  const currentPrice = changePriceCurrency(
    product.variants.edges[0].node.price,
    currency
  );

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.title,
    image: product.images.edges[0].node.url,
    description: productDescription,
    brand: {
      '@type': 'Brand',
      name: product.brand.references.edges[0].node.handle,
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '5',
      reviewCount: '97',
    },
    offers: {
      '@type': 'Offer',
      url: `https://www.finswimmershop.com/product/${product.title}`,
      priceCurrency: currentPrice.currencyCode,
      price: currentPrice.amount,
      itemCondition: 'https://schema.org/NewCondition',
      availability: 'https://schema.org/InStock',
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
