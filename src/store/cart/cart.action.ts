import {
  ActionWithPayload,
  createAction,
  withMatcher,
} from '../../utils/reducer/reducer.util';
import { Product } from '../categories/categories.types';
import { CART_ACTION_TYPES, CartItem } from './cart.types';

type CartToggle = ActionWithPayload<CART_ACTION_TYPES.CART_TOGGLE, boolean>;

type SetCartItems = ActionWithPayload<
  CART_ACTION_TYPES.SET_CART_ITEMS,
  CartItem[]
>;

export const setIsCartOpen = withMatcher(
  (boolean: boolean): CartToggle =>
    createAction(CART_ACTION_TYPES.CART_TOGGLE, boolean)
);

export const setCartItems = withMatcher(
  (cartItems: CartItem[]): SetCartItems =>
    createAction(CART_ACTION_TYPES.SET_CART_ITEMS, cartItems)
);

export const addItemToCart = (
  cartItems: CartItem[],
  productToAdd: Product
): SetCartItems => {
  const newCartItems = addCartItem(cartItems, productToAdd);
  return setCartItems(newCartItems);
};

export const removeItemFromCart = (
  cartItems: CartItem[],
  productToRemove: CartItem
): SetCartItems => {
  const newCartItems = removeItemCart(cartItems, productToRemove);
  return setCartItems(newCartItems);
};

export const clearItemFromCart = (
  cartItems: CartItem[],
  productIdToRemove: number
): SetCartItems => {
  const newCartItems = clearItemCart(cartItems, productIdToRemove);
  return setCartItems(newCartItems);
};

function addCartItem(cartItems: CartItem[], productToAdd: Product): CartItem[] {
  const existingCartItem = cartItems.find(
    (item) => item.id === productToAdd.id
  );

  if (existingCartItem) {
    return cartItems.map((item) =>
      item.id === productToAdd.id
        ? { ...item, quantity: item.quantity + 1 }
        : item
    );
  }

  return [...cartItems, { ...productToAdd, quantity: 1 }];
}

const removeItemCart = (
  cartItems: CartItem[],
  productToRemove: CartItem
): CartItem[] => {
  const existingCartItem = cartItems.find(
    (item) => item.id === productToRemove.id
  );

  if (existingCartItem && existingCartItem.quantity > 1) {
    return cartItems.map((item) =>
      item.id === productToRemove.id
        ? { ...item, quantity: item.quantity - 1 }
        : item
    );
  }

  return cartItems.filter((item) => item.id !== productToRemove.id);
};

const clearItemCart = (cartItems: CartItem[], productIdToRemove: number) =>
  cartItems.filter((item) => item.id !== productIdToRemove);
