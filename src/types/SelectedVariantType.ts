export interface SelectedVariantType {
  id: string;
  title: string;
  price: { amount: string; currencyCode: string };
  selectedOptions: { name: string; value: string }[];
}
