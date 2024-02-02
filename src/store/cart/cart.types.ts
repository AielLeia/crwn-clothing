import { Product } from '../categories/categories.types';

export type CartItem = Product & {
  quantity: number;
};
