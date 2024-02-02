import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { CartItem } from './cart.types';

export type CartState = {
  isCartOpen: boolean;
  cartItems: CartItem[];
};

const CART_INITIAL_STATE: CartState = {
  isCartOpen: false,
  cartItems: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState: CART_INITIAL_STATE,
  reducers: {
    setCartIsOpen(state, action: PayloadAction<boolean>) {
      state.isCartOpen = action.payload;
    },
    setCartItems(state, action: PayloadAction<CartItem[]>) {
      state.cartItems = action.payload;
    },
  },
});

export const cartReducer = cartSlice.reducer;

export const { setCartIsOpen, setCartItems } = cartSlice.actions;
