import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { CartProvider, useCart } from '../CartContext';
import { Product } from '@/types';

const mockProduct: Product = {
  id: 1,
  title: 'Test Product',
  price: 29.99,
  description: 'Test description',
  category: 'test',
  image: 'test.jpg',
  rating: {
    rate: 4.5,
    count: 100
  }
};

function TestComponent() {
  const { cartItems, addToCart, removeFromCart, updateQuantity, getTotalItems, getTotalPrice, clearCart } = useCart();

  return (
    <div>
      <div data-testid="cart-items-count">{cartItems.length}</div>
      <div data-testid="total-items">{getTotalItems()}</div>
      <div data-testid="total-price">{getTotalPrice()}</div>
      <button onClick={() => addToCart(mockProduct)}>Add to Cart</button>
      <button onClick={() => removeFromCart(1)}>Remove from Cart</button>
      <button onClick={() => updateQuantity(1, 2)}>Update Quantity</button>
      <button onClick={clearCart}>Clear Cart</button>
      {cartItems.map(item => (
        <div key={item.id} data-testid={`cart-item-${item.id}`}>
          {item.title} - Quantity: {item.quantity}
        </div>
      ))}
    </div>
  );
}

describe('CartContext', () => {
  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  it('adds items to cart', () => {
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );

    expect(screen.getByTestId('cart-items-count')).toHaveTextContent('0');
    
    fireEvent.click(screen.getByText('Add to Cart'));
    
    expect(screen.getByTestId('cart-items-count')).toHaveTextContent('1');
    expect(screen.getByTestId('total-items')).toHaveTextContent('1');
    expect(screen.getByTestId(`cart-item-${mockProduct.id}`)).toBeInTheDocument();
  });

  it('increases quantity when adding same item', () => {
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );

    fireEvent.click(screen.getByText('Add to Cart'));
    fireEvent.click(screen.getByText('Add to Cart'));
    
    expect(screen.getByTestId('cart-items-count')).toHaveTextContent('1');
    expect(screen.getByTestId('total-items')).toHaveTextContent('2');
    expect(screen.getByTestId(`cart-item-${mockProduct.id}`)).toHaveTextContent('Quantity: 2');
  });

  it('removes items from cart', () => {
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );

    fireEvent.click(screen.getByText('Add to Cart'));
    expect(screen.getByTestId('cart-items-count')).toHaveTextContent('1');
    
    fireEvent.click(screen.getByText('Remove from Cart'));
    expect(screen.getByTestId('cart-items-count')).toHaveTextContent('0');
  });

  it('updates item quantity', () => {
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );

    fireEvent.click(screen.getByText('Add to Cart'));
    fireEvent.click(screen.getByText('Update Quantity'));
    
    expect(screen.getByTestId(`cart-item-${mockProduct.id}`)).toHaveTextContent('Quantity: 2');
    expect(screen.getByTestId('total-items')).toHaveTextContent('2');
  });

  it('calculates total price correctly', () => {
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );

    fireEvent.click(screen.getByText('Add to Cart'));
    fireEvent.click(screen.getByText('Add to Cart'));
    
    expect(screen.getByTestId('total-price')).toHaveTextContent((mockProduct.price * 2).toString());
  });

  it('clears cart', () => {
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );

    fireEvent.click(screen.getByText('Add to Cart'));
    expect(screen.getByTestId('cart-items-count')).toHaveTextContent('1');
    
    fireEvent.click(screen.getByText('Clear Cart'));
    expect(screen.getByTestId('cart-items-count')).toHaveTextContent('0');
  });

  it('throws error when useCart is used outside CartProvider', () => {
    const originalError = console.error;
    console.error = jest.fn();
    
    expect(() => {
      render(<TestComponent />);
    }).toThrow('useCart must be used within a CartProvider');
    
    console.error = originalError;
  });

  it('handles localStorage parsing error', () => {
    const originalError = console.error;
    console.error = jest.fn();
    
    localStorage.setItem('cart', 'invalid-json');
    
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );
    
    expect(console.error).toHaveBeenCalledWith(
      'Error loading cart from localStorage:',
      expect.any(Error)
    );
    
    console.error = originalError;
  });
});
