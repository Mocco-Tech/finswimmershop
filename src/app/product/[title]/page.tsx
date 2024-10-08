import React from 'react';
import { Params } from 'next/dist/shared/lib/router/utils/route-matcher';
import { notFound } from 'next/navigation';

import { getSingleProduct } from '@/shopify/queries/getSingleProduct';
import ProductDataProvider from '@/components/custom/product/ProductDataProvider';
import ProductContent from '@/components/custom/product/ProductContent';
import StructuredData from '@/components/custom/product/StructuredData';

export const revalidate = 3600;

export default async function ProductPage({ params }: { params: Params }) {
  const productObj = await getSingleProduct(params.title);
  const product = productObj?.data?.productByHandle;
  if (!product) {
    notFound();
  }

  return (
    <ProductDataProvider product={product}>
      <ProductContent />
      <StructuredData product={product} />
    </ProductDataProvider>
  );
}

export async function generateMetadata({
  params,
}: {
  params: { title: string };
}) {
  const props = await getSingleProduct(params.title);
  const product = props?.data?.productByHandle;
  const productTitle = product?.seo?.title
    ? product?.seo?.title
    : product?.title;
  const productDescription = product?.seo?.description
    ? product?.seo?.description
    : product?.description;
  const productImage = product?.images?.edges[0]
    ? product?.images?.edges[0]?.node?.url
    : '/no-image.webp';

  return {
    title: productTitle + ' - Finswimmer Shop',
    description: `${productDescription?.substr(0, 155)}`,

    metadataBase: new URL('https://www.finswimeershop.com'),
    openGraph: {
      title: productTitle,
      description: productDescription?.substr(0, 155),
      url: `https://moccotech.com/product/${params.title}`,
      siteName: 'Finswimmershop',
      images: [
        {
          url: productImage,
          width: 800,
          height: 600,
        },
      ],
      locale: 'en_US',
      type: 'website',
    },
  };
}
