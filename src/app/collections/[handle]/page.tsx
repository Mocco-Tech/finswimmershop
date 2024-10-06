import React from "react";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";

import { getCollection } from "@/shopify/queries/getCollection";
import { CollectionType } from "@/types/CollectionType";
import CollectionContent from "@/components/custom/collection/CollectionContent";
import { getSortedProducts } from "@/lib/helpers";
import { PER_PAGE } from "@/lib/consts";

export const revalidate = 3600;

export default async function ProductCategoryPage({
  params,
  searchParams,
}: {
  params: Params;
  searchParams: { brand: string; sortBy: string; page: string };
}) {
  const collection: CollectionType = await getCollection(params.handle);

  const page = searchParams.page ?? "1";
  const start = (Number(page) - 1) * PER_PAGE;
  const end = start + PER_PAGE;

  const productsArr = collection.data.collectionByHandle.products.edges;
  const products = productsArr.slice(start, end);

  getSortedProducts(products, searchParams.sortBy);

  if (searchParams.brand) {
    const filteredProducts = productsArr
      .filter(
        (product) =>
          product.node?.brand?.references?.edges?.[0]?.node.handle ===
          searchParams.brand
      )
      .slice(start, end);
    const filteredProductsAll =
      collection.data.collectionByHandle.productsAll.edges.filter(
        (product) =>
          product.node?.brand?.references?.edges?.[0]?.node.handle ===
          searchParams.brand
      );

    return (
      <CollectionContent
        collection={collection}
        products={filteredProducts}
        productsAll={filteredProductsAll}
        end={end}
      />
    );
  }

  return (
    <CollectionContent
      collection={collection}
      products={products}
      productsAll={collection.data.collectionByHandle.productsAll.edges}
      end={end}
    />
  );
}

export async function generateMetadata({
  params,
}: {
  params: { handle: string };
}) {
  const props = await getCollection(params.handle);
  const collectionSeo = props?.data?.collectionByHandle;

  const seoTitle = collectionSeo?.seo.title
    ? collectionSeo?.seo.title
    : collectionSeo?.title;
  const seoDescription = collectionSeo?.seo.description
    ? collectionSeo?.seo.description
    : collectionSeo?.description;
  const image = collectionSeo?.image?.src
    ? collectionSeo?.image?.src
    : "/empty-category.jpg";

  return {
    title: `${seoTitle} | Finswimmer Shop`,
    description: seoDescription,

    metadataBase: new URL("https://www.finswimmershop.com"),
    openGraph: {
      title: `${seoTitle} | Finswimmer Shop`,
      description: seoDescription,
      url: `https://www.finswimmershop.com/collections/${params?.handle}`,
      siteName: "Finswimmer Shop",
      images: [
        {
          url: image,
          width: 800,
          height: 600,
        },
      ],
      locale: "en_US",
      type: "website",
    },
  };
}
