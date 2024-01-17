import { createContext, useReducer } from "react";

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
  ADD_ITEM_TO_CART: "ADD_ITEM_TO_CART",
  REMOVE_ITEM_FROM_CART: "REMOVE_ITEM_FROM_CART",
  CLEAR_ITEM_FROM_CART: "CLEAR_ITEM_FROM_CART",
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

const computeAddItemToCart = (state, payload) => {
  const newCartItems = addCartItem(state.cartItems, payload);
  const { newTotalItems, newTotalPrice } =
    computeNewTotalPriceAndTotalItems(newCartItems);

  return {
    ...state,
    cartItems: newCartItems,
    totalItems: newTotalItems,
    totalPrice: newTotalPrice,
  };
};

const computeRemoveItemFromCart = (state, payload) => {
  const newCartItems = removeItemCart(state.cartItems, payload);
  const { newTotalItems, newTotalPrice } =
    computeNewTotalPriceAndTotalItems(newCartItems);

  return {
    ...state,
    cartItems: newCartItems,
    totalItems: newTotalItems,
    totalPrice: newTotalPrice,
  };
};

const computeClearItemFromCart = (state, payload) => {
  const newCartItems = clearItemCart(state.cartItems, payload);

  const { newTotalItems, newTotalPrice } =
    computeNewTotalPriceAndTotalItems(newCartItems);

  return {
    ...state,
    cartItems: newCartItems,
    totalItems: newTotalItems,
    totalPrice: newTotalPrice,
  };
};

const cartReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case CART_ACTION_TYPES.ADD_ITEM_TO_CART:
      return computeAddItemToCart(state, payload);
    case CART_ACTION_TYPES.REMOVE_ITEM_FROM_CART:
      return computeRemoveItemFromCart(state, payload);
    case CART_ACTION_TYPES.CLEAR_ITEM_FROM_CART:
      return computeClearItemFromCart(state, payload);
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

  const addItemToCart = (productToAdd) => {
    dispatch({
      type: CART_ACTION_TYPES.ADD_ITEM_TO_CART,
      payload: productToAdd,
    });
  };
  const removeItemFromCart = (productToRemove) => {
    dispatch({
      type: CART_ACTION_TYPES.REMOVE_ITEM_FROM_CART,
      payload: productToRemove,
    });
  };
  const clearItemFromCart = (productIdToRemove) => {
    dispatch({
      type: CART_ACTION_TYPES.CLEAR_ITEM_FROM_CART,
      payload: productIdToRemove,
    });
  };

  const setIsCartOpen = () => {
    dispatch({ type: CART_ACTION_TYPES.CART_TOGGLE });
  };

  const { totalItems, cartItems, isCartOpen, totalPrice } = state;

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
