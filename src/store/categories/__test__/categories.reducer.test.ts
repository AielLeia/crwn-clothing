import { describe, expect, test } from 'vitest';

import {
  CATEGORIES_INITIAL_STATE,
  CategoryState,
  categoriesReducer,
  fetchCategoriesFailed,
  fetchCategoriesStart,
  fetchCategoriesSuccess,
} from '../categories.reducer';
import { Category } from '../categories.types';

describe('Categories reduces test', () => {
  test('It should trigger a categories fetch', () => {
    const expectedState: CategoryState = {
      ...CATEGORIES_INITIAL_STATE,
      isLoading: true,
    };

    expect(
      categoriesReducer(CATEGORIES_INITIAL_STATE, fetchCategoriesStart())
    ).toEqual(expectedState);
  });

  test('It should fetch successfully all categories', () => {
    const mockPayload: Category[] = [
      {
        title: 'mens',
        imageUrl: 'mens_imageUrl',
        items: [
          {
            id: 1,
            name: 'Mens 1',
            imageUrl: 'mens_1_imageUrl',
            price: 50,
          },
          {
            id: 2,
            name: 'Mens 2',
            imageUrl: 'mens_2_imageUrl',
            price: 60,
          },
        ],
      },
      {
        title: 'women',
        imageUrl: 'women_imageUrl',
        items: [
          {
            id: 1,
            name: 'women 1',
            imageUrl: 'women_1_imageUrl',
            price: 50,
          },
          {
            id: 2,
            name: 'women 2',
            imageUrl: 'women_2_imageUrl',
            price: 60,
          },
        ],
      },
    ];
    const expectedState: CategoryState = {
      ...CATEGORIES_INITIAL_STATE,
      isLoading: false,
      categories: [...mockPayload],
    };

    expect(
      categoriesReducer(
        CATEGORIES_INITIAL_STATE,
        fetchCategoriesSuccess(mockPayload)
      )
    ).toEqual(expectedState);
  });

  test('It should fetch failure when a error occur', () => {
    const mockError: globalThis.Error = new Error('Fetch categories failed');
    const expectedState: CategoryState = {
      ...CATEGORIES_INITIAL_STATE,
      isLoading: false,
      error: mockError,
    };

    expect(
      categoriesReducer(
        CATEGORIES_INITIAL_STATE,
        fetchCategoriesFailed(mockError)
      )
    ).toEqual(expectedState);
  });
});
