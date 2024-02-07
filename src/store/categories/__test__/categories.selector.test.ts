import { describe, expect, test } from 'vitest';

import {
  selectCategories,
  selectCategoriesIsLoading,
  selectCategoriesMap,
} from '../categories.selector';
import { CategoryMap } from '../categories.types';

import { RootState } from '../../store';

const mockCategories = [
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
    title: 'womens',
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
const mockState: RootState = {
  categories: {
    isLoading: false,
    categories: mockCategories,
    error: null,
  },
  user: {
    currentUser: null,
    error: null,
    isLoading: false,
  },
  cart: {
    cartItems: [],
    isCartOpen: false,
  },
};

describe('Categories selector test', () => {
  test('It should return categories data', () => {
    expect(selectCategories(mockState)).toEqual(mockCategories);
  });

  test('It should return loading state', () => {
    expect(selectCategoriesIsLoading(mockState)).toEqual(false);
  });

  test('It should return categories organized by title', () => {
    const expectedCategoriesMap: CategoryMap = {
      mens: [
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
      womens: [
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
    };

    expect(selectCategoriesMap(mockState)).toEqual(expectedCategoriesMap);
  });
});
