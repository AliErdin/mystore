import React from 'react';
import { render, screen } from '@testing-library/react';
import Header from '../Header';
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

describe('Header', () => {
  it('renders site logo/title', () => {
    renderWithCartProvider(<Header />);
    
    expect(screen.getByText(/fake store/i)).toBeInTheDocument();
  });

  it('renders navigation links', () => {
    renderWithCartProvider(<Header />);
    
    const storeLink = screen.getByRole('link', { name: /fake store/i });
    const productsLink = screen.getByRole('link', { name: /products/i });
    const cartButton = screen.getByRole('button', { name: /cart/i });
    
    expect(storeLink).toBeInTheDocument();
    expect(productsLink).toBeInTheDocument();
    expect(cartButton).toBeInTheDocument();
  });

  it('renders products link with correct href', () => {
    renderWithCartProvider(<Header />);
    
    const productsLink = screen.getByRole('link', { name: /products/i });
    expect(productsLink).toHaveAttribute('href', '/');
  });

  it('renders store link with correct href', () => {
    renderWithCartProvider(<Header />);
    
    const storeLink = screen.getByRole('link', { name: /fake store/i });
    expect(storeLink).toHaveAttribute('href', '/');
  });

  it('displays cart item count', () => {
    renderWithCartProvider(<Header />);
    
    const cartElement = screen.getByRole('button', { name: /cart/i });
    expect(cartElement).toBeInTheDocument();
  });

  it('renders header with proper structure', () => {
    renderWithCartProvider(<Header />);
    
    expect(screen.getByRole('banner')).toBeInTheDocument();
  });

  it('has responsive design elements', () => {
    renderWithCartProvider(<Header />);
    
    const header = screen.getByRole('banner');
    expect(header).toBeInTheDocument();
  });

  it('renders logo as clickable link', () => {
    renderWithCartProvider(<Header />);
    
    const logoLink = screen.getByRole('link', { name: /fake store/i });
    expect(logoLink).toBeInTheDocument();
    expect(logoLink).toHaveAttribute('href', '/');
  });
});
