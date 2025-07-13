export interface Product {
  id: string;
  priceId: string;
  name: string;
  description: string;
  mode: 'payment' | 'subscription';
  price: number;
  currency: string;
  interval?: 'month' | 'year';
}

export const products: Product[] = [
  {
    id: 'prod_Sfm9eRwW55D5Bu',
    priceId: 'price_1RkQbHPjcHpgF26ukr162HTm',
    name: 'Secret Stash Multivers',
    description: 'SecretStash Multiverse is a privacy-first, all-in-one digital organization tool for developers, engineers, and power users. It combines a secure secrets vault, a finance matrix, and a universal snippet/code manager-all with a playful, customizable cosmic interface.',
    mode: 'subscription',
    price: 4.97,
    currency: 'USD',
    interval: 'month'
  }
];

export const getProductByPriceId = (priceId: string): Product | undefined => {
  return products.find(product => product.priceId === priceId);
};

export const getProductById = (id: string): Product | undefined => {
  return products.find(product => product.id === id);
};