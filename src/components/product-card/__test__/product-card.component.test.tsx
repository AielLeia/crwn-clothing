import { screen } from '@testing-library/react';
import user from '@testing-library/user-event';
import { describe, expect, test } from 'vitest';

import { ProductCard } from '../product-card.component';

import { Product } from '@/store/categories/categories.types';

import { renderWithProviders } from '@/utils/test/test.util';

describe('Product card test', () => {
  test('It should add the product item when the product cart button is clicked', async () => {
    const mockProduct: Product = {
      id: 1,
      imageUrl: 'test',
      name: 'fake product',
      price: 24,
    };
    const { store } = renderWithProviders(
      <ProductCard product={mockProduct} />,
      {
        preloadedState: {
          cart: {
            cartItems: [],
            isCartOpen: false,
          },
        },
      }
    );

    const addToCartButtonElement = screen.getByText(/add to cart/i);
    await user.click(addToCartButtonElement);

    expect(store.getState().cart.cartItems).toHaveLength(1);
  });
});
