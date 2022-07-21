import { Product } from '../Models/product.js';

export type Sales = {
  product: Product;
  saleDate: string;
  saleQuantity: number;
  selected: boolean;
};
