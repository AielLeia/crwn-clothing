import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { Category } from './categories.types';

export type CategoryState = {
  categories: Category[];
  isLoading: boolean;
  error: Error | null;
};

const CATEGORIES_INITIAL_STATE: CategoryState = {
  categories: [],
  isLoading: false,
  error: null,
};

const categoriesSlice = createSlice({
  name: 'categories',
  initialState: CATEGORIES_INITIAL_STATE,
  reducers: {
    fetchCategoriesStart(state) {
      state.isLoading = true;
    },
    fetchCategoriesSuccess(state, action: PayloadAction<Category[]>) {
      state.categories = action.payload;
      state.isLoading = false;
    },
    fetchCategoriesFailed(state, action: PayloadAction<Error>) {
      state.error = action.payload;
      state.isLoading = false;
    },
  },
});

export const categoriesReducer = categoriesSlice.reducer;
export const {
  fetchCategoriesStart,
  fetchCategoriesSuccess,
  fetchCategoriesFailed,
} = categoriesSlice.actions;

export const FETCH_CATEGORIES_START = 'categories/fetchCategoriesStart';
