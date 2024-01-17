import { createContext, useReducer } from "react";
import { createAction } from "../utils/reducer/reducer.util.js";

const addCartItem = (cartItems, productToAdd) => {
  let existingCartItem = cartItems.find((item) => item.id === productToAdd.id);

  if (existingCartItem) {
    return cartItems.map((item) =>
      item.id === productToAdd.id
        ? { ...item, quantity: item.quantity + 1 }
        : item,
    );
  }

  return [...cartItems, { ...productToAdd, quantity: 1 }];
};

const removeItemCart = (cartItems, productToRemove) => {
  const existingCartItem = cartItems.find(
    (item) => item.id === productToRemove.id,
  );

  if (existingCartItem && existingCartItem.quantity > 1) {
    return cartItems.map((item) =>
      item.id === productToRemove.id
        ? { ...item, quantity: item.quantity - 1 }
        : item,
    );
  }

  return cartItems.filter((item) => item.id !== productToRemove.id);
};

const clearItemCart = (cartItems, productIdToRemove) =>
  cartItems.filter((item) => item.id !== productIdToRemove);

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  removeItemFromCart: () => {},
  clearItemFromCart: () => {},
  totalItems: 0,
  totalPrice: 0,
});

export const CART_ACTION_TYPES = {
  SET_CART_ITEMS: "SET_CART_ITEMS",
  CART_TOGGLE: "CART_TOGGLE",
};

const computeNewTotalPriceAndTotalItems = (newCartItems) => {
  const newTotalItems = newCartItems.reduce(
    (previousValue, currentValue) => previousValue + currentValue.quantity,
    0,
  );
  const newTotalPrice = newCartItems.reduce(
    (previousValue, currentValue) =>
      previousValue + currentValue.price * currentValue.quantity,
    0,
  );
  return { newTotalItems, newTotalPrice };
};
const cartReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case CART_ACTION_TYPES.SET_CART_ITEMS:
      return {
        ...state,
        ...payload,
      };
    case CART_ACTION_TYPES.CART_TOGGLE:
      return {
        ...state,
        isCartOpen: !state.isCartOpen,
      };
    default:
      throw new Error(`Unhandled type ${type} in cartReducer`);
  }
};

const INITIAL_STATE = {
  isCartOpen: false,
  cartItems: [],
  totalItems: 0,
  totalPrice: 0,
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, INITIAL_STATE);

  const { totalItems, cartItems, isCartOpen, totalPrice } = state;

  const updateCartItemsReducers = (newCartItems) => {
    const { newTotalPrice, newTotalItems } =
      computeNewTotalPriceAndTotalItems(newCartItems);
    dispatch(
      createAction(CART_ACTION_TYPES.SET_CART_ITEMS, {
        cartItems: newCartItems,
        totalItems: newTotalItems,
        totalPrice: newTotalPrice,
      }),
    );
  };

  const addItemToCart = (productToAdd) => {
    const newCartItems = addCartItem(cartItems, productToAdd);
    updateCartItemsReducers(newCartItems);
  };

  const removeItemFromCart = (productToRemove) => {
    const newCartItems = removeItemCart(cartItems, productToRemove);
    updateCartItemsReducers(newCartItems);
  };

  const clearItemFromCart = (productIdToRemove) => {
    const newCartItems = clearItemCart(cartItems, productIdToRemove);
    updateCartItemsReducers(newCartItems);
  };

  const setIsCartOpen = () => {
    dispatch(createAction(CART_ACTION_TYPES.CART_TOGGLE));
  };

  const value = {
    totalItems,
    cartItems,
    isCartOpen,
    setIsCartOpen,
    addItemToCart,
    removeItemFromCart,
    clearItemFromCart,
    totalPrice,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
