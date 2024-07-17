import { ProductType } from '@/types/ProductType';

export function cutMenuLink(menuItem: string) {
  const url = menuItem.split('https://finswimmershop.myshopify.com')[1];
  return url;
}

export function cutPagesMenuLink(menuItem: string) {
  const url = menuItem.split(
    'https://finswimmershop.myshopify.com' + '/pages/'
  )[1];
  return url;
}

export function isItemNew(publishDate: string) {
  const publishedAt = new Date(publishDate);
  const today = new Date();
  const sevenDaysAgo = 7 * 24 * 60 * 60 * 1000;

  const isNew = today.getTime() - publishedAt.getTime() > sevenDaysAgo;
  return isNew;
}

export function getBrands(
  productsArray: { node: ProductType; cursor?: string | undefined }[]
) {
  let brands: { handle: string; name: string }[] = [];
  productsArray.forEach((element) => {
    if (element.node.brand) {
      const brand = element.node.brand.references.edges[0].node;
      brands.push({
        handle: brand.handle,
        name: brand.fields[0].value,
      });
    }
  });

  const uniqueBrands: { handle: string; name: string }[] = brands.filter(
    (obj, index) =>
      brands.findIndex((item) => item.handle === obj.handle) === index
  );

  return uniqueBrands;
}

export function getSortedProducts(
  products: { node: ProductType; cursor?: string | undefined }[],
  sortBy: string
) {
  switch (sortBy) {
    case 'price_updated_up':
      products.sort(
        (a, b) => Number(b.node.publishedAt) - Number(a.node.publishedAt)
      );
      break;
    case 'price_high_to_low':
      products.sort(
        (a, b) =>
          Number(b.node.priceRange.minVariantPrice.amount) -
          Number(a.node.priceRange.minVariantPrice.amount)
      );
      break;
    case 'price_low_to_high':
      products.sort(
        (a, b) =>
          Number(a.node.priceRange.minVariantPrice.amount) -
          Number(b.node.priceRange.minVariantPrice.amount)
      );
      break;

    default:
      products.sort(
        (a, b) => Number(b.node.publishedAt) - Number(a.node.publishedAt)
      );
      break;
  }
}
