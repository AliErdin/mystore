import React from 'react';
import { render, screen } from '@testing-library/react';
import ProductsPage from '../ProductsPage';
import { CartProvider } from '@/contexts/CartContext';

// Mock i18n translation for placeholder
jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key: string) => {
    if (key === 'search_by_title') return 'Search by title';
    if (key === 'all_categories') return 'All Categories';
    if (key === 'default') return 'Default';
    return key;
  } })
}));

const renderWithCartProvider = (component: React.ReactElement) => {
  return render(
    <CartProvider>
      {component}
    </CartProvider>
  );
};

const mockProducts = [
  {
    id: 1,
    title: 'Test Product 1',
    price: 29.99,
    description: 'Test description 1',
    category: 'electronics',
    image: 'https://example.com/image1.jpg',
    rating: {
      rate: 4.5,
      count: 100
    }
  },
  {
    id: 2,
    title: 'Test Product 2',
    price: 39.99,
    description: 'Test description 2',
    category: 'jewelery',
    image: 'https://example.com/image2.jpg',
    rating: {
      rate: 4.0,
      count: 50
    }
  }
];

const mockCategories = ['electronics', 'jewelery', 'men\'s clothing', 'women\'s clothing'];

describe('ProductsPage', () => {
  const defaultProps = {
    products: mockProducts,
    categories: mockCategories,
    currentPage: 1,
    totalPages: 1,
    totalItems: 2,
    itemsPerPage: 20
  };

  it('renders products correctly', () => {
    renderWithCartProvider(<ProductsPage {...defaultProps} />);
    
    expect(screen.getByText('Test Product 1')).toBeInTheDocument();
    expect(screen.getByText('Test Product 2')).toBeInTheDocument();
  });

  it('renders filters correctly', () => {
    renderWithCartProvider(<ProductsPage {...defaultProps} />);
    
    expect(screen.getByPlaceholderText(/search by title/i)).toBeInTheDocument();
    
    expect(screen.getByText(/all categories/i)).toBeInTheDocument();
  });

  it('handles empty products', () => {
    const emptyProps = {
      ...defaultProps,
      products: [],
      totalItems: 0
    };

    renderWithCartProvider(<ProductsPage {...emptyProps} />);
    
    expect(screen.getByPlaceholderText(/search by title/i)).toBeInTheDocument();
  });

  it('renders responsive layout', () => {
    renderWithCartProvider(<ProductsPage {...defaultProps} />);
    
    expect(screen.getByPlaceholderText(/search by title/i)).toBeInTheDocument();
  });
});
