import { Product } from '../categories/categories.types';

export enum CART_ACTION_TYPES {
  SET_CART_ITEMS = 'cart/SET_CART_ITEMS',
  CART_TOGGLE = 'cart/CART_TOGGLE',
}

export type CartItem = Product & {
  quantity: number;
};
