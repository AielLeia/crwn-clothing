import { screen } from '@testing-library/react';
import { describe, expect, test, vi } from 'vitest';

import { Category } from '../category.component';

import { renderWithProviders } from '@/utils/test/test.util';

vi.mock('react-router-dom', async (importOriginal) => {
  const actual = await importOriginal();

  return {
    ...Object.assign({}, actual),
    useParams: () => ({
      category: 'mens',
    }),
  };
});

describe('Category test', () => {
  test('It should render a spinner if isLoading is true', () => {
    renderWithProviders(<Category />, {
      preloadedState: {
        categories: {
          isLoading: true,
          categories: [],
          error: null,
        },
      },
    });

    const spinner = screen.getByTestId('spinner');

    expect(spinner).toBeInTheDocument();
  });

  test('It should render products if isLoading is false and there are product present', () => {
    renderWithProviders(<Category />, {
      preloadedState: {
        categories: {
          isLoading: false,
          categories: [
            {
              title: 'mens',
              imageUrl: 'mens_photo',
              items: [
                {
                  id: 1,
                  name: 'Product 1',
                  imageUrl: 'produc_1',
                  price: 40,
                },
                {
                  id: 2,
                  name: 'Product 2',
                  imageUrl: 'produc_2',
                  price: 40,
                },
              ],
            },
          ],
          error: null,
        },
      },
    });

    const spinner = screen.queryByTestId('spinner');
    expect(spinner).not.toBeInTheDocument();

    const productsElements = screen.getAllByRole('button', {
      name: /add to cart/i,
    });
    expect(productsElements).toHaveLength(2);
  });
});
