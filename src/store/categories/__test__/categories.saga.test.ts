import { expectSaga, testSaga } from 'redux-saga-test-plan';
import { throwError } from 'redux-saga-test-plan/providers';
import { TakeEffect, call } from 'redux-saga/effects';
import { describe, test } from 'vitest';

import {
  FETCH_CATEGORIES_START,
  fetchCategoriesFailed,
  fetchCategoriesSuccess,
} from '../categories.reducer';
import { Category } from '../categories.types';

import { getCategoriesAndDocuments } from '@/utils/firebase/firebase.util';

import {
  categoriesSaga,
  fetchCategoriesAsync,
  onFetchCategories,
} from '../categories.saga';

describe('Categories saga test', () => {
  test('it should raise a categories saga', () => {
    testSaga(categoriesSaga)
      .next()
      .all([call(onFetchCategories)])
      .next()
      .isDone();
  });

  test('onFetchCategories', () => {
    testSaga(onFetchCategories)
      .next()
      .inspect<TakeEffect>((yieldedValue) => {
        expect(yieldedValue['@@redux-saga/IO']).toBe(true);
        expect(yieldedValue.combinator).toBe(false);
        expect(yieldedValue.type).toBe('FORK');
        expect(JSON.stringify(yieldedValue.payload)).toContain(
          FETCH_CATEGORIES_START
        );
      })
      .next()
      .isDone();
  });

  test('fetchCategoriesAsync success', () => {
    const mockCategories: Category[] = [
      { title: 'Category 1', imageUrl: 'category_1', items: [] },
      { title: 'Category 2', imageUrl: 'category_2', items: [] },
    ];

    return expectSaga(fetchCategoriesAsync)
      .provide([[call(getCategoriesAndDocuments), mockCategories]])
      .put(fetchCategoriesSuccess(mockCategories))
      .run();
  });

  test('fetchCategoriesAsync failure', () => {
    const error = new Error('fetchCategoriesAsync failure');

    return expectSaga(fetchCategoriesAsync)
      .provide([[call(getCategoriesAndDocuments), throwError(error)]])
      .put(fetchCategoriesFailed(error))
      .run();
  });
});
