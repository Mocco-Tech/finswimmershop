import React from 'react';

import ProductCard from '@/components/custom/collection/ProductCard';
import { getProducts } from '@/shopify/queries/getProducts';
import { ProductType } from '@/types/ProductType';
import ShopContent from '@/components/custom/shop/ShopContent';
import { getSortedProducts } from '@/lib/helpers';

export default async function ShopPage({
  searchParams,
}: {
  searchParams: { brand: string; sortBy: string };
}) {
  const props = await getProducts();
  const products: { node: ProductType }[] = props.data.products.edges;
  const productsAll: { node: ProductType }[] = props.data.productsAll.edges;

  getSortedProducts(products, searchParams.sortBy);

  if (searchParams.brand) {
    const filteredProducts = products.filter(
      (product) =>
        product.node?.brand?.references?.edges?.[0]?.node.handle ===
        searchParams.brand
    );
    return (
      <ShopContent products={filteredProducts} productsAll={productsAll} />
    );
  }

  return <ShopContent products={products} productsAll={productsAll} />;
}
