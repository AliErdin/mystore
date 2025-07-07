import React from 'react';
import { render, screen } from '@testing-library/react';
import ProductGrid from '../ProductGrid';
import { CartProvider } from '@/contexts/CartContext';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string, options?: Record<string, unknown>) => {
      if (key === 'add_to_cart') return 'Add to cart';
      if (key === 'currency') return options && options.price ? `$${options.price}` : '$';
      if (key === 'no_products_found') return 'No products found';
      if (key === 'no_products_found_desc') return 'Try adjusting your filters or search terms.';
      return key;
    }
  })
}));

import Image from 'next/image';
jest.mock('next/image', () => {
  return function MockImage({ src, alt, ...props }: { src: string; alt: string; [key: string]: unknown }) {
    return <Image src={src} alt={alt} {...props} />;
  };
});

jest.mock('next/link', () => {
  return function MockLink({ children, href, ...props }: { children: React.ReactNode; href: string; [key: string]: unknown }) {
    return <a href={href} {...props}>{children}</a>;
  };
});

const mockProducts = [
  {
    id: 1,
    title: 'Product 1',
    price: 29.99,
    description: 'Description 1',
    category: 'electronics',
    image: 'https://example.com/image1.jpg',
    rating: { rate: 4.5, count: 120 }
  },
  {
    id: 2,
    title: 'Product 2',
    price: 49.99,
    description: 'Description 2',
    category: 'clothing',
    image: 'https://example.com/image2.jpg',
    rating: { rate: 3.8, count: 85 }
  },
  {
    id: 3,
    title: 'Product 3',
    price: 19.99,
    description: 'Description 3',
    category: 'books',
    image: 'https://example.com/image3.jpg',
    rating: { rate: 4.2, count: 200 }
  }
];

const renderWithCartProvider = (component: React.ReactElement) => {
  return render(
    <CartProvider>
      {component}
    </CartProvider>
  );
};

describe('ProductGrid', () => {
  it('renders products in grid layout', () => {
    renderWithCartProvider(<ProductGrid products={mockProducts} />);
    
    expect(screen.getByText('Product 1')).toBeInTheDocument();
    expect(screen.getByText('Product 2')).toBeInTheDocument();
    expect(screen.getByText('Product 3')).toBeInTheDocument();
  });

  it('renders correct number of product cards', () => {
    renderWithCartProvider(<ProductGrid products={mockProducts} />);
    
    const productCards = screen.getAllByRole('link');
    expect(productCards).toHaveLength(mockProducts.length);
  });

  it('displays empty state when no products', () => {
    renderWithCartProvider(<ProductGrid products={[]} />);
    
    expect(screen.getByText(/no products found/i)).toBeInTheDocument();
  });

  it('shows loading state when loading prop is true', () => {
    renderWithCartProvider(<ProductGrid products={[]} loading={true} />);
    
    expect(screen.queryByText(/no products found/i)).not.toBeInTheDocument();
    
    const loadingCards = document.querySelectorAll('.loading-card');
    expect(loadingCards.length).toBeGreaterThan(0);
  });

  it('renders product information correctly', () => {
    renderWithCartProvider(<ProductGrid products={mockProducts} />);
    
    expect(screen.getByText('Product 1')).toBeInTheDocument();
    expect(screen.getByText('$29.99')).toBeInTheDocument();
    
    expect(screen.getByAltText('Product 1')).toBeInTheDocument();
    expect(screen.getByAltText('Product 2')).toBeInTheDocument();
    expect(screen.getByAltText('Product 3')).toBeInTheDocument();
  });

  it('renders add to cart buttons for all products', () => {
    renderWithCartProvider(<ProductGrid products={mockProducts} />);
    
    const addToCartButtons = screen.getAllByRole('button', { name: /add to cart/i });
    expect(addToCartButtons).toHaveLength(mockProducts.length);
  });

  it('handles single product', () => {
    const singleProduct = [mockProducts[0]];
    renderWithCartProvider(<ProductGrid products={singleProduct} />);
    
    expect(screen.getByText('Product 1')).toBeInTheDocument();
    expect(screen.getAllByRole('link')).toHaveLength(1);
  });

  it('renders rating for each product', () => {
    renderWithCartProvider(<ProductGrid products={mockProducts} />);
    
    const starRatings = screen.getAllByText(/★/);
    expect(starRatings.length).toBeGreaterThanOrEqual(mockProducts.length);
  });

  it('does not show loading state when loading is false', () => {
    renderWithCartProvider(<ProductGrid products={mockProducts} loading={false} />);
    
    expect(screen.getByText('Product 1')).toBeInTheDocument();
    
    const loadingCards = document.querySelectorAll('.loading-card');
    expect(loadingCards).toHaveLength(0);
  });

  it('shows empty state message with proper styling', () => {
    renderWithCartProvider(<ProductGrid products={[]} />);
    
    const emptyMessage = screen.getByText(/no products found/i);
    expect(emptyMessage).toBeInTheDocument();
    
    const emptyContainer = emptyMessage.closest('div');
    expect(emptyContainer).toBeInTheDocument();
  });

  it('handles products with different price formats', () => {
    const productsWithDifferentPrices = [
      { ...mockProducts[0], price: 5 },
      { ...mockProducts[1], price: 99.95 },
      { ...mockProducts[2], price: 1000 }
    ];
    
    renderWithCartProvider(<ProductGrid products={productsWithDifferentPrices} />);
    
    expect(screen.getByText(/\$5/)).toBeInTheDocument();
    expect(screen.getByText(/\$99\.95/)).toBeInTheDocument();
    expect(screen.getByText(/\$1000/)).toBeInTheDocument();
  });
});
