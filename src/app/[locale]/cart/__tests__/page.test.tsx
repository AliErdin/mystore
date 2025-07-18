import React from 'react';
import { render, screen } from '@testing-library/react';
import CartPage from '../page';

jest.mock('@/components/templates/CartPage/CartPage', () => {
  return function MockCartPage() {
    return <div data-testid="cart-page">Cart Page Component</div>;
  };
});

describe('Cart Page', () => {
  it('renders without crashing', () => {
    render(<CartPage />);
    
    expect(screen.getByTestId('cart-page')).toBeInTheDocument();
  });

  it('renders CartPage component', () => {
    render(<CartPage />);
    
    expect(screen.getByText('Cart Page Component')).toBeInTheDocument();
  });

  it('has correct page structure', () => {
    render(<CartPage />);
    
    const cartPage = screen.getByTestId('cart-page');
    expect(cartPage).toBeInTheDocument();
  });
});
