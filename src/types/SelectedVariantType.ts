import { CurrencyCode } from '@shopify/hydrogen-react/storefront-api-types';

export interface SelectedVariantType {
  id: string;
  title: string;
  price: { amount: string; currencyCode: CurrencyCode };
  compareAtPrice: { amount: string; currencyCode: CurrencyCode };
  selectedOptions: { name: string; value: string }[];
}
