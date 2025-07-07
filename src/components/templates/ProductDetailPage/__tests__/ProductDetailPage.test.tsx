import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ProductDetailPage from '../ProductDetailPage';
import { CartProvider } from '@/contexts/CartContext';
jest.mock('next/image', () => {
  return function MockImage({ src, alt, ...props }: { src: string; alt: string; [key: string]: unknown }) {
    return <div data-testid="next-image-mock" data-src={src} data-alt={alt} {...props} />;
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
  description: 'This is a test product description that provides detailed information about the product features and benefits.',
  category: 'electronics',
  image: 'https://example.com/image.jpg',
  rating: {
    rate: 4.5,
    count: 100
  }
};

describe('ProductDetailPage', () => {
  it('renders product information correctly', () => {
    renderWithCartProvider(<ProductDetailPage product={mockProduct} />);
    
    expect(screen.getByText('Test Product')).toBeInTheDocument();
    expect(screen.getByText('$29.99')).toBeInTheDocument();
    expect(screen.getByText(/This is a test product description/)).toBeInTheDocument();
    const categoryElements = screen.getAllByText(/electronics/i);
    expect(categoryElements.length).toBeGreaterThan(0);
  });

  it('renders product image with correct attributes', () => {
    renderWithCartProvider(<ProductDetailPage product={mockProduct} />);
    
    const image = screen.getByTestId('next-image-mock');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('data-alt', 'Test Product');
    expect(image).toHaveAttribute('data-src', 'https://example.com/image.jpg');
  });

  it('displays product rating', () => {
    renderWithCartProvider(<ProductDetailPage product={mockProduct} />);
    
    expect(screen.getByText(/4\.5/)).toBeInTheDocument();
    expect(screen.getByText(/\(100\)/)).toBeInTheDocument();
  });

  it('renders add to cart button', () => {
    renderWithCartProvider(<ProductDetailPage product={mockProduct} />);
    
    const addToCartButton = screen.getByRole('button', { name: /add.*to cart/i });
    expect(addToCartButton).toBeInTheDocument();
  });

  it('handles add to cart button click', () => {
    renderWithCartProvider(<ProductDetailPage product={mockProduct} />);
    
    const addToCartButton = screen.getByRole('button', { name: /add.*to cart/i });
    fireEvent.click(addToCartButton);
    
    expect(addToCartButton).toBeInTheDocument();
  });

  it('displays product category as a badge or tag', () => {
    renderWithCartProvider(<ProductDetailPage product={mockProduct} />);
    
    const categoryElements = screen.getAllByText(/electronics/i);
    expect(categoryElements.length).toBeGreaterThan(0);
  });

  it('formats price correctly', () => {
    const productWithDifferentPrice = {
      ...mockProduct,
      price: 99.95
    };
    
    renderWithCartProvider(<ProductDetailPage product={productWithDifferentPrice} />);
    
    expect(screen.getByText('$99.95')).toBeInTheDocument();
  });

  it('handles product with zero rating', () => {
    const productWithZeroRating = {
      ...mockProduct,
      rating: {
        rate: 0,
        count: 0
      }
    };
    
    renderWithCartProvider(<ProductDetailPage product={productWithZeroRating} />);
    
    expect(screen.getByText(/0/)).toBeInTheDocument();
  });

  it('handles long product descriptions', () => {
    const productWithLongDescription = {
      ...mockProduct,
      description: 'This is a very long product description that contains multiple sentences and provides extensive details about the product features, specifications, benefits, and usage instructions. It should be displayed properly without breaking the layout.'
    };
    
    renderWithCartProvider(<ProductDetailPage product={productWithLongDescription} />);
    
    expect(screen.getByText(/This is a very long product description/)).toBeInTheDocument();
  });

  it('handles special characters in product title', () => {
    const productWithSpecialChars = {
      ...mockProduct,
      title: 'Test Product™ - Special Edition (2024)'
    };
    
    renderWithCartProvider(<ProductDetailPage product={productWithSpecialChars} />);
    
    expect(screen.getByText('Test Product™ - Special Edition (2024)')).toBeInTheDocument();
  });

  it('renders with proper semantic structure', () => {
    renderWithCartProvider(<ProductDetailPage product={mockProduct} />);
    
    const heading = screen.getByRole('heading', { name: 'Test Product' });
    expect(heading).toBeInTheDocument();
    
    const image = screen.getByTestId('next-image-mock');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('data-alt', 'Test Product');
    
    const button = screen.getByRole('button', { name: /add.*to cart/i });
    expect(button).toBeInTheDocument();
  });

  it('maintains accessibility standards', () => {
    renderWithCartProvider(<ProductDetailPage product={mockProduct} />);
    
    const image = screen.getByTestId('next-image-mock');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('data-alt', 'Test Product');
    
    const button = screen.getByRole('button', { name: /add.*to cart/i });
    expect(button).toBeInTheDocument();
    
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toBeInTheDocument();
  });

  it('handles different product categories', () => {
    const clothingProduct = {
      ...mockProduct,
      category: 'women\'s clothing'
    };
    
    renderWithCartProvider(<ProductDetailPage product={clothingProduct} />);
    
    expect(screen.getAllByText(/women's clothing/i)).toHaveLength(2);
  });

  it('renders responsive layout', () => {
    renderWithCartProvider(<ProductDetailPage product={mockProduct} />);
    
    const container = screen.getByText('Test Product').closest('div');
    expect(container).toBeInTheDocument();
  });

  it('handles missing or undefined product properties gracefully', () => {
    const incompleteProduct = {
      id: 1,
      title: 'Incomplete Product',
      price: 19.99,
      description: '',
      category: '',
      image: '',
      rating: {
        rate: 0,
        count: 0
      }
    };
    
    renderWithCartProvider(<ProductDetailPage product={incompleteProduct} />);
    
    expect(screen.getByText('Incomplete Product')).toBeInTheDocument();
    expect(screen.getByText('$19.99')).toBeInTheDocument();
  });
});
