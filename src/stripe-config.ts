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
    id: 'prod_SfmrPuaDgmk6qT',
    priceId: 'price_1RkRI3Bsr66TjEhQOafqQSbH',
    name: 'Secret Stash',
    description: 'SecretStash Multiverse is a privacy-first, all-in-one digital organization tool for developers, engineers, and power users. It combines a secure secrets vault, a finance matrix, and a universal snippet/code manager—all with a playful, customizable cosmic interface.',
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