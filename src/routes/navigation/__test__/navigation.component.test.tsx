import { screen } from '@testing-library/react';
import user from '@testing-library/user-event';
import { describe, expect, test, vi } from 'vitest';

import Navigation from '../navigation.component';

import { signOutStart } from '@/store/user/user.reducer';

import { renderWithProviders } from '@/utils/test/test.util';

const mockDispatch = vi.fn();

vi.mock('react-redux', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...Object.assign({}, actual),
    useDispatch: () => mockDispatch,
  };
});

describe('Navigation test', () => {
  afterEach(() => {
    mockDispatch.mockClear();
    vi.restoreAllMocks();
  });

  test('It should render the logo and navigation links', () => {
    renderWithProviders(<Navigation />);

    const logoElement = screen.getByText('CrownClothingLogo');
    const shopLinkElement = screen.getByText(/shop/i);

    expect(logoElement).toBeInTheDocument();
    expect(shopLinkElement).toBeInTheDocument();
  });

  test('It should render a sign link and not a sign out link if there is no current user', () => {
    renderWithProviders(<Navigation />, {
      preloadedState: {
        user: { currentUser: null, isLoading: false, error: null },
      },
    });

    const signOutLinkElement = screen.queryByText(/sign out/i);
    const signInLinkElement = screen.getByText(/sign in/i);

    expect(signOutLinkElement).not.toBeInTheDocument();
    expect(signInLinkElement).toBeInTheDocument();
  });

  test('It should render sign out link and not sign in link if there is current user', () => {
    renderWithProviders(<Navigation />, {
      preloadedState: {
        user: {
          currentUser: {
            email: 'fake@test.com',
            displayName: 'Fakename',
            createdAt: new Date(),
          },
          isLoading: false,
          error: null,
        },
      },
    });

    const signOutLinkElement = screen.getByText(/sign out/i);
    const signInLinkElement = screen.queryByText(/sign in/i);

    expect(signOutLinkElement).toBeInTheDocument();
    expect(signInLinkElement).not.toBeInTheDocument();
  });

  test('It should render a cart dropdown when the dropdown is visible', () => {
    renderWithProviders(<Navigation />, {
      preloadedState: {
        cart: {
          cartItems: [],
          isCartOpen: true,
        },
      },
    });

    const cartDropdownElement = screen.getByText(/Your cart is empty/i);

    expect(cartDropdownElement).toBeInTheDocument();
  });

  test('It should not render a cart dropdown when the dropdown is not visible', () => {
    renderWithProviders(<Navigation />, {
      preloadedState: {
        cart: {
          cartItems: [],
          isCartOpen: true,
        },
      },
    });

    const cartDropdownElement = screen.queryByText(/Your cart is empty/i);

    expect(cartDropdownElement).toBeInTheDocument();
  });

  test('It should display the correct number of items in the cart', () => {
    renderWithProviders(<Navigation />, {
      preloadedState: {
        cart: {
          cartItems: [
            { id: 1, name: 'Item 1', price: 10, quantity: 1, imageUrl: 'Test' },
            { id: 2, name: 'Item 2', price: 20, quantity: 1, imageUrl: 'Test' },
            { id: 3, name: 'Item 3', price: 30, quantity: 1, imageUrl: 'Test' },
          ],
          isCartOpen: false,
        },
      },
    });

    const cartCountElement = screen.getByText('3');

    expect(cartCountElement).toBeInTheDocument();
  });

  test('It should display all items when card dropdown is open', () => {
    renderWithProviders(<Navigation />, {
      preloadedState: {
        cart: {
          cartItems: [
            { id: 1, name: 'Item 1', price: 10, quantity: 1, imageUrl: 'Test' },
            { id: 2, name: 'Item 2', price: 20, quantity: 1, imageUrl: 'Test' },
            { id: 3, name: 'Item 3', price: 30, quantity: 1, imageUrl: 'Test' },
          ],
          isCartOpen: true,
        },
      },
    });

    const cartDropdownItems = screen.getAllByRole('img');

    expect(cartDropdownItems).toHaveLength(3);
  });

  test('It should dispatch signOutStart action when clicking on the sign out link', async () => {
    renderWithProviders(<Navigation />, {
      preloadedState: {
        user: {
          currentUser: {
            email: 'fake@test.com',
            displayName: 'Fakename',
            createdAt: new Date(),
          },
          isLoading: false,
          error: null,
        },
      },
    });

    const signOutLinkElement = screen.getByText(/sign out/i);
    expect(signOutLinkElement).toBeInTheDocument();

    await user.click(signOutLinkElement);

    expect(mockDispatch).toHaveBeenCalled();
    expect(mockDispatch).toHaveBeenCalledWith(signOutStart());
  });
});
