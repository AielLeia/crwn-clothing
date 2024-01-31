import '@testing-library/jest-dom';
import { render, screen, within } from '@testing-library/react';
import { describe, expect, test } from 'vitest';

import { Button } from '../button.component';

import { BUTTON_TYPE_CLASSES } from '../button.types';

describe('buttons tests', () => {
  test('should render base button when nothing is passed', () => {
    render(<Button />);

    const button = screen.getByRole('button');
    expect(button).toHaveStyle({ backgroundColor: 'black;' });
  });

  test('should render google sign in button when passed google button type', () => {
    render(<Button buttonType={BUTTON_TYPE_CLASSES.google} />);

    const button = screen.getByRole('button');
    expect(button).toHaveStyle({ backgroundColor: '#4285f4;' });
  });

  test('should render inverted button when passed inverted button type ', () => {
    render(<Button buttonType={BUTTON_TYPE_CLASSES.inverted} />);

    const button = screen.getByRole('button');
    expect(button).toHaveStyle({ backgroundColor: 'white;' });
  });

  test('should be disabled if isLoading is true', () => {
    render(<Button isLoading={true} />);

    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
  });

  test('should render a spinning button when isLoading is true', () => {
    render(<Button isLoading={true} />);

    const button = screen.getByRole('button');
    const spinningDiv = within(button).getByRole('generic');
    expect(spinningDiv).toHaveStyle({
      animation: 'spin 1s ease-in-out infinite',
    });
  });
});
