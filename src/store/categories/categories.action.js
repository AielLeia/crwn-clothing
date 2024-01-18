import { createAction } from "../../utils/reducer/reducer.util.js";
import { CATEGORIES_ACTION_TYPES } from "./categories.types.js";

export const setCategoriesMap = (categoriesMap) =>
  createAction(CATEGORIES_ACTION_TYPES.SET_CATEGORIES_MAP, categoriesMap);
