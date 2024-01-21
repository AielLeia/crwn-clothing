import { all, call, put, takeLatest } from 'redux-saga/effects';

import {
  fetchCategoriesFailed,
  fetchCategoriesSuccess,
} from './categories.action.ts';
import { CATEGORIES_ACTION_TYPES } from './categories.types';

import { getCategoriesAndDocuments } from '../../utils/firebase/firebase.util.js';

export function* fetchCategoriesAsync() {
  try {
    const categories = yield call(getCategoriesAndDocuments);
    yield put(fetchCategoriesSuccess(categories));
  } catch (e) {
    yield put(fetchCategoriesFailed(e));
  }
}

export function* onFetchCategories() {
  yield takeLatest(
    CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START,
    fetchCategoriesAsync
  );
}

export function* categoriesSaga() {
  yield all([call(onFetchCategories)]);
}
