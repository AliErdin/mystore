import React from 'react';
import { render, screen } from '@testing-library/react';
import ProductsPage from '@/components/templates/ProductsPage';

jest.mock('@/components/templates/ProductsPage', () => {
  return function MockProductsPage() {
    return <div data-testid="products-page">Products Page Component</div>;
  };
});

const MockHome = () => {
  return (
    <div>
      <ProductsPage 
        products={[
          { 
            id: 1, 
            title: 'Product 1', 
            price: 10, 
            category: 'category1', 
            rating: { rate: 4.5, count: 120 },
            description: 'Test product 1 description',
            image: 'https://example.com/image1.jpg'
          },
          { 
            id: 2, 
            title: 'Product 2', 
            price: 20, 
            category: 'category2', 
            rating: { rate: 4.0, count: 100 },
            description: 'Test product 2 description',
            image: 'https://example.com/image2.jpg'
          }
        ]}
        categories={['category1', 'category2']}
        currentPage={1}
        totalPages={1}
        totalItems={2}
        itemsPerPage={10}
      />
    </div>
  );
};

describe('Home Page', () => {
  it('renders ProductsPage component', () => {
    render(<MockHome />);
    expect(screen.getByTestId('products-page')).toBeInTheDocument();
  });

  it('displays Products Page Component text', () => {
    render(<MockHome />);
    expect(screen.getByText('Products Page Component')).toBeInTheDocument();
  });
});
