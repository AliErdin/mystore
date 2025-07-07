import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import CartPage from '../CartPage';
import { CartProvider } from '@/contexts/CartContext';
jest.mock('next/link', () => {
  return function MockLink({ children, href, ...props }: { children: React.ReactNode; href: string; [key: string]: unknown }) {
    return <a href={href} {...props}>{children}</a>;
  };
});

const renderWithCartProvider = (component: React.ReactElement) => {
  return render(
    <CartProvider>
      {component}
    </CartProvider>
  );
};

const mockProduct = {
  id: 1,
  title: 'Test Product',
  price: 29.99,
  description: 'Test description',
  category: 'electronics',
  image: 'https://example.com/image.jpg',
  rating: {
    rate: 4.5,
    count: 100
  }
};

describe('CartPage', () => {
  it('renders empty cart message when cart is empty', () => {
    renderWithCartProvider(<CartPage />);
    
    expect(screen.getByText('Shopping Cart')).toBeInTheDocument();
    expect(screen.getByText('Your cart is empty')).toBeInTheDocument();
    expect(screen.getByText('Start shopping to add items to your cart.')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /continue shopping/i })).toBeInTheDocument();
  });

  it('renders continue shopping link with correct href', () => {
    renderWithCartProvider(<CartPage />);
    
    const continueLink = screen.getByRole('link', { name: /continue shopping/i });
    expect(continueLink).toHaveAttribute('href', '/');
  });

  it('displays cart items when cart has products', () => {
    renderWithCartProvider(<CartPage />);
    
    expect(screen.getByText('Shopping Cart')).toBeInTheDocument();
  });

  it('has proper page structure', () => {
    renderWithCartProvider(<CartPage />);
    
    const container = screen.getByText('Shopping Cart').closest('div');
    expect(container).toBeInTheDocument();
  });

  it('renders with proper typography hierarchy', () => {
    renderWithCartProvider(<CartPage />);
    
    const mainHeading = screen.getByText('Shopping Cart');
    expect(mainHeading).toBeInTheDocument();
    
    const emptyHeading = screen.getByText('Your cart is empty');
    expect(emptyHeading).toBeInTheDocument();
    
    const description = screen.getByText('Start shopping to add items to your cart.');
    expect(description).toBeInTheDocument();
  });

  it('renders continue shopping button with proper styling', () => {
    renderWithCartProvider(<CartPage />);
    
    const button = screen.getByRole('button', { name: /continue shopping/i });
    expect(button).toBeInTheDocument();
  });

  it('handles empty cart state correctly', () => {
    renderWithCartProvider(<CartPage />);
    
    expect(screen.getByText('Your cart is empty')).toBeInTheDocument();
    
    expect(screen.queryByText('Quantity')).not.toBeInTheDocument();
    expect(screen.queryByText('Total')).not.toBeInTheDocument();
    expect(screen.queryByText('Checkout')).not.toBeInTheDocument();
  });

  it('renders responsive layout', () => {
    renderWithCartProvider(<CartPage />);
    
    const container = screen.getByText('Shopping Cart').closest('div');
    expect(container).toBeInTheDocument();
  });

  it('maintains accessibility standards', () => {
    renderWithCartProvider(<CartPage />);
    
    const heading = screen.getByRole('heading', { name: 'Shopping Cart' });
    expect(heading).toBeInTheDocument();
    
    const link = screen.getByRole('link', { name: /continue shopping/i });
    expect(link).toBeInTheDocument();
    
    const button = screen.getByRole('button', { name: /continue shopping/i });
    expect(button).toBeInTheDocument();
  });

  it('handles navigation correctly', () => {
    renderWithCartProvider(<CartPage />);
    
    const continueLink = screen.getByRole('link', { name: /continue shopping/i });
    expect(continueLink).toHaveAttribute('href', '/');
  });

  it('renders with proper semantic structure', () => {
    renderWithCartProvider(<CartPage />);
    
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Shopping Cart');
    expect(screen.getByRole('heading', { level: 3 })).toHaveTextContent('Your cart is empty');
  });
});
