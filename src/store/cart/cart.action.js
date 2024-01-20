import { createAction } from '../../utils/reducer/reducer.util.js';
import { CART_ACTION_TYPES } from './cart.types.js';

export const setIsCartOpen = (boolean) =>
  createAction(CART_ACTION_TYPES.CART_TOGGLE, boolean);

export const addItemToCart = (cartItems, productToAdd) => {
  const newCartItems = addCartItem(cartItems, productToAdd);
  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};

export const removeItemFromCart = (cartItems, productToRemove) => {
  const newCartItems = removeItemCart(cartItems, productToRemove);
  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};

export const clearItemFromCart = (cartItems, productIdToRemove) => {
  const newCartItems = clearItemCart(cartItems, productIdToRemove);
  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};

const addCartItem = (cartItems, productToAdd) => {
  let existingCartItem = cartItems.find((item) => item.id === productToAdd.id);

  if (existingCartItem) {
    return cartItems.map((item) =>
      item.id === productToAdd.id
        ? { ...item, quantity: item.quantity + 1 }
        : item
    );
  }

  return [...cartItems, { ...productToAdd, quantity: 1 }];
};

const removeItemCart = (cartItems, productToRemove) => {
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

const clearItemCart = (cartItems, productIdToRemove) =>
  cartItems.filter((item) => item.id !== productIdToRemove);
