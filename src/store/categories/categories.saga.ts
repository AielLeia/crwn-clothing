import { all, call, put, takeLatest } from 'typed-redux-saga';

import {
  fetchCategoriesFailed,
  fetchCategoriesSuccess,
} from './categories.action';
import { CATEGORIES_ACTION_TYPES } from './categories.types';

import { getCategoriesAndDocuments } from '../../utils/firebase/firebase.util';

export function* fetchCategoriesAsync() {
  try {
    const categories = yield* call(getCategoriesAndDocuments);
    yield* put(fetchCategoriesSuccess(categories));
  } catch (e) {
    yield* put(fetchCategoriesFailed(e as Error));
  }
}

export function* onFetchCategories() {
  yield* takeLatest(
    CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START,
    fetchCategoriesAsync
  );
}

export function* categoriesSaga() {
  yield* all([call(onFetchCategories)]);
}
