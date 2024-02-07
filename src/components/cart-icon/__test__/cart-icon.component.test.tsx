import { screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';

import { CartIcon } from '../cart-icon.component';

import { CartItem } from '@/store/cart/cart.types';

import { renderWithProviders } from '@/utils/test/test.util';

describe('Cart icon test', () => {
  test('Uses preloaded state to render', () => {
    const initialCartItems: CartItem[] = [
      {
        id: 1,
        name: 'Item A',
        imageUrl: 'test',
        price: 10,
        quantity: 4,
      },
      {
        id: 1,
        name: 'Item B',
        imageUrl: 'test 2',
        price: 34,
        quantity: 8,
      },
    ];

    renderWithProviders(<CartIcon />, {
      preloadedState: {
        cart: { cartItems: initialCartItems, isCartOpen: false },
      },
    });

    const cartIconElement = screen.getByText('12');

    expect(cartIconElement).toBeInTheDocument();
  });
});
