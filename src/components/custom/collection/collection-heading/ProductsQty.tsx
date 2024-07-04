import React from 'react';

export default function ProductsQty({ productsQty }: { productsQty: number }) {
  return (
    <p className="font-light">
      {productsQty > 1 ? productsQty + ' results' : productsQty + ' result'}
    </p>
  );
}
