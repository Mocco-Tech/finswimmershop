'use client';

import {
  AddToCartButton,
  CartCheckoutButton,
  Money,
  useCart,
  useProduct,
} from '@shopify/hydrogen-react';
import Image from 'next/image';
import React from 'react';

export default function ProductContent() {
  const { product, variants, setSelectedVariant, selectedVariant } =
    useProduct();
  const price = product?.variants?.edges?.[0]?.node?.price;

  const {
    status,
    cartCreate,
    totalQuantity,
    checkoutUrl,
    buyerIdentity,
    error,
  } = useCart();

  const merchandise = { merchandiseId: selectedVariant?.id };

  return (
    <>
      <h1>{product?.title}</h1>
      <Money data={selectedVariant ? selectedVariant?.price! : price!} />
      {product?.featuredImage && (
        <Image
          src={product?.featuredImage?.url!}
          alt={`${product?.title} image`}
          width={500}
          height={500}
          className=""
          priority
        />
      )}
      {variants?.map((variant) => (
        <button
          onClick={() => setSelectedVariant(variant!)}
          key={variant?.id}
          className={`mr-2 w-10 h-8 rounded-lg ${
            selectedVariant?.id === variant?.id ? 'bg-sky-500' : 'bg-sky-300'
          }`}
        >
          {variant?.title}
        </button>
      ))}
      <AddToCartButton
        variantId={selectedVariant?.id}
        className="bg-indigo-500 px-4 py-2 rounded-lg text-slate-50"
        // onClick={() => cartCreate()}
      >
        Add to cart
      </AddToCartButton>
      <CartCheckoutButton>Checkout</CartCheckoutButton>
      <div>
        Cart Status: {status}
        <p>{totalQuantity}</p>
        <p>{checkoutUrl}</p>
        <p>{error}</p>
        {/* <button
          onClick={() =>
            cartCreate({ attributes: [], buyerIdentity: buyerIdentity })
          }
        >
          Add Line
        </button> */}
      </div>
    </>
  );
}
