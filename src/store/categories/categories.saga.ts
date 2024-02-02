import { all, call, put, takeLatest } from 'typed-redux-saga';

import {
  FETCH_CATEGORIES_START,
  fetchCategoriesFailed,
  fetchCategoriesSuccess,
} from './categories.reducer';

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
  yield* takeLatest(FETCH_CATEGORIES_START, fetchCategoriesAsync);
}

export function* categoriesSaga() {
  yield* all([call(onFetchCategories)]);
}
