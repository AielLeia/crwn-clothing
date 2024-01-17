import { createContext, useEffect, useState } from "react";

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

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const newTotalItems = cartItems.reduce(
      (previousValue, currentValue) => previousValue + currentValue.quantity,
      0,
    );
    setTotalItems(newTotalItems);
  }, [cartItems]);

  useEffect(() => {
    const newTotalPrice = cartItems.reduce(
      (previousValue, currentValue) =>
        previousValue + currentValue.price * currentValue.quantity,
      0,
    );
    setTotalPrice(newTotalPrice);
  }, [cartItems]);

  const addItemToCart = (productToAdd) => {
    setCartItems(addCartItem(cartItems, productToAdd));
  };
  const removeItemFromCart = (productToRemove) => {
    setCartItems(removeItemCart(cartItems, productToRemove));
  };
  const clearItemFromCart = (productIdToRemove) => {
    setCartItems(clearItemCart(cartItems, productIdToRemove));
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
