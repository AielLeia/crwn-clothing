import { combineReducers } from 'redux';

import { cartReducer } from './cart/cart.reducer.js';
import { categoriesReducer } from './categories/categories.reducer.js';
import { userReducer } from './user/user.reducer.js';

export const rootReducer = combineReducers({
  user: userReducer,
  categories: categoriesReducer,
  cart: cartReducer,
});
