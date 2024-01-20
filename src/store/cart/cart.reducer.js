import { CART_ACTION_TYPES } from './cart.types.js';

const CART_INITIAL_STATE = {
  isCartOpen: false,
  cartItems: [],
};

const cartReducer = (state = CART_INITIAL_STATE, action = {}) => {
  const { type, payload } = action;

  switch (type) {
    case CART_ACTION_TYPES.SET_CART_ITEMS:
      return {
        ...state,
        cartItems: payload,
      };
    case CART_ACTION_TYPES.CART_TOGGLE:
      return {
        ...state,
        isCartOpen: payload,
      };
    default:
      return state;
  }
};

export { cartReducer };
