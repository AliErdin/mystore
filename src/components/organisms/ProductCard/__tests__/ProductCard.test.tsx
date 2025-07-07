import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ProductCard from '../ProductCard';
import { CartProvider } from '@/contexts/CartContext';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string, options?: Record<string, unknown>) => {
      if (key === 'add_to_cart') return 'Add to cart';
      if (key === 'currency') return options && options.price ? `$${options.price}` : '$';
      return key;
    }
  })
}));

jest.mock('next/image', () => {
  return function MockImage({ src, alt, ...props }: { src: string; alt: string; [key: string]: unknown }) {
    return <div data-testid="next-image-mock" data-src={src} data-alt={alt} {...props} />;
  };
});

jest.mock('next/link', () => {
  return function MockLink({ children, href, ...props }: { children: React.ReactNode; href: string; [key: string]: unknown }) {
    return <a href={href} {...props}>{children}</a>;
  };
});

const mockProduct = {
  id: 1,
  title: 'Test Product',
  price: 29.99,
  description: 'This is a test product description',
  category: 'electronics',
  image: 'https://example.com/image.jpg',
  rating: {
    rate: 4.5,
    count: 120
  }
};

const renderWithCartProvider = (component: React.ReactElement) => {
  return render(
    <CartProvider>
      {component}
    </CartProvider>
  );
};

describe('ProductCard', () => {
  it('renders basic product information', () => {
    renderWithCartProvider(<ProductCard product={mockProduct} />);
    
    expect(screen.getByText('Test Product')).toBeInTheDocument();
    expect(screen.getByText('$29.99')).toBeInTheDocument();
    
    const image = screen.getByTestId('next-image-mock');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('data-alt', 'Test Product');
  });

  it('renders product image with correct attributes', () => {
    renderWithCartProvider(<ProductCard product={mockProduct} />);
    
    const image = screen.getByTestId('next-image-mock');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('data-alt', 'Test Product');
    expect(image).toHaveAttribute('data-src', 'https://example.com/image.jpg');
  });

  it('renders rating component', () => {
    renderWithCartProvider(<ProductCard product={mockProduct} />);
    
    expect(screen.getByText(/★/)).toBeInTheDocument();
    expect(screen.getByText(/\(120\)/)).toBeInTheDocument();
  });

  it('renders add to cart button', () => {
    renderWithCartProvider(<ProductCard product={mockProduct} />);
    
    const addButton = screen.getByRole('button', { name: /add to cart/i });
    expect(addButton).toBeInTheDocument();
  });

  it('handles add to cart button click', () => {
    renderWithCartProvider(<ProductCard product={mockProduct} />);
    
    const addButton = screen.getByRole('button', { name: /add to cart/i });
    fireEvent.click(addButton);
    
    expect(addButton).toBeInTheDocument();
  });

  it('renders product link with correct href', () => {
    renderWithCartProvider(<ProductCard product={mockProduct} />);
    
    const productLink = screen.getByRole('link');
    expect(productLink).toHaveAttribute('href', '/products/1');
  });

  it('truncates long product titles', () => {
    const longTitleProduct = {
      ...mockProduct,
      title: 'This is a very long product title that should be truncated when displayed in the card'
    };
    
    renderWithCartProvider(<ProductCard product={longTitleProduct} />);
    
    expect(screen.getByText(longTitleProduct.title)).toBeInTheDocument();
  });

  it('handles products with no rating', () => {
    const noRatingProduct = {
      ...mockProduct,
      rating: { rate: 0, count: 0 }
    };
    
    renderWithCartProvider(<ProductCard product={noRatingProduct} />);
    
    expect(screen.getByText(/☆/)).toBeInTheDocument();
    
    const ratingElements = screen.getAllByText((content, element) => {
      return element?.textContent?.includes('0') || false;
    });
    expect(ratingElements.length).toBeGreaterThan(0);
  });

  it('formats price correctly', () => {
    const expensiveProduct = {
      ...mockProduct,
      price: 1299.99
    };
    
    renderWithCartProvider(<ProductCard product={expensiveProduct} />);
    
    expect(screen.getByText('$1299.99')).toBeInTheDocument();
  });

  it('handles different categories', () => {
    const clothingProduct = {
      ...mockProduct,
      category: "men's clothing"
    };
    
    renderWithCartProvider(<ProductCard product={clothingProduct} />);
    
    expect(screen.getByText('Test Product')).toBeInTheDocument();
  });

  it('renders card structure correctly', () => {
    renderWithCartProvider(<ProductCard product={mockProduct} />);
    
    const image = screen.getByTestId('next-image-mock');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('data-alt', 'Test Product');
    expect(screen.getByText('Test Product')).toBeInTheDocument();
    expect(screen.getByText('$29.99')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /add to cart/i })).toBeInTheDocument();
  });
});
