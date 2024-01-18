import { CATEGORIES_ACTION_TYPES } from "./categories.types.js";

const CATEGORIES_INITIA_STATE = {
  categories: [],
};

export const categoriesReducer = (
  state = CATEGORIES_INITIA_STATE,
  action = {},
) => {
  const { type, payload } = action;

  switch (type) {
    case CATEGORIES_ACTION_TYPES.SET_CATEGORIES:
      return { ...state, categories: payload };
    default:
      return state;
  }
};
