import { Product } from '../categories/categories.types';
import { setCartIsOpen, setCartItems } from './cart.reducer';
import { CartItem } from './cart.types';

export const setIsCartOpen = setCartIsOpen;

export const addItemToCart = (cartItems: CartItem[], productToAdd: Product) => {
  const newCartItems = addCartItem(cartItems, productToAdd);
  return setCartItems(newCartItems);
};

export const removeItemFromCart = (
  cartItems: CartItem[],
  productToRemove: CartItem
) => {
  const newCartItems = removeItemCart(cartItems, productToRemove);
  return setCartItems(newCartItems);
};

export const clearItemFromCart = (
  cartItems: CartItem[],
  productIdToRemove: number
) => {
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
