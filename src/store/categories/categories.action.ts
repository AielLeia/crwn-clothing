import {
  Action,
  ActionWithPayload,
  createAction,
} from '../../utils/reducer/reducer.util';
import { CATEGORIES_ACTION_TYPES, Category } from './categories.types';

type FetchCategoriesStart =
  Action<CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START>;

type FetchCategoriesSuccess = ActionWithPayload<
  CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS,
  Category[]
>;

type FetchCategoriesFailed = ActionWithPayload<
  CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILED,
  Error
>;

export type CategoryAction =
  | FetchCategoriesFailed
  | FetchCategoriesSuccess
  | FetchCategoriesStart;

export const fetchCategoriesStart = (): FetchCategoriesStart =>
  createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START);

export const fetchCategoriesSuccess = (
  categories: Category[]
): FetchCategoriesSuccess =>
  createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS, categories);

export const fetchCategoriesFailed = (error: Error): FetchCategoriesFailed =>
  createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILED, error);
