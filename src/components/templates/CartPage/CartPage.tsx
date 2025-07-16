'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styled from 'styled-components';
import { useCart } from '@/contexts/CartContext';
import Button from '@/components/atoms/Button';
import Typography from '@/components/atoms/Typography';
import { useTheme } from '@/contexts/ThemeContext';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  background-color: ${({ theme }) => theme.colors.background};

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const Header = styled.div`
  margin-bottom: 2rem;
`;

const CartContainer = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const CartItems = styled.div`
  background: ${({ theme }) => theme.colors.background};
  border-radius: 0.5rem;
  box-shadow: 0 2px 8px ${({ theme }) => theme.colors.shadow};
  overflow: hidden;
`;

const CartItem = styled.div`
  display: grid;
  grid-template-columns: 80px 1fr auto auto;
  gap: 1rem;
  padding: 1.5rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  align-items: center;

  &:last-child {
    border-bottom: none;
  }

  @media (max-width: 480px) {
    grid-template-columns: 60px 1fr;
    gap: 0.5rem;
  }
`;

const ItemImage = styled.div`
  position: relative;
  width: 80px;
  height: 80px;
  background: ${({ theme }) => theme.colors.background};
  border-radius: 0.25rem;
  overflow: hidden;

  @media (max-width: 480px) {
    width: 60px;
    height: 60px;
  }
`;

const ItemInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const ItemTitle = styled(Link)`
  color: ${({ theme }) => theme.colors.text};
  text-decoration: none;
  font-weight: 600;
  
  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const QuantityControls = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  @media (max-width: 480px) {
    grid-column: 1 / -1;
    justify-self: start;
    margin-top: 0.5rem;
  }
`;

const QuantityButton = styled(Button)`
  min-width: 2rem;
  padding: 0.25rem;
`;

const QuantityDisplay = styled.span`
  min-width: 2rem;
  text-align: center;
  font-weight: 600;
`;

const ItemPrice = styled.div`
  text-align: right;

  @media (max-width: 480px) {
    grid-column: 2;
    grid-row: 1;
    justify-self: end;
  }
`;

const CartSummary = styled.div`
  background: ${({ theme }) => theme.colors.background};
  border-radius: 0.5rem;
  box-shadow: 0 2px 8px ${({ theme }) => theme.colors.shadow};
  padding: 1.5rem;
  height: fit-content;
`;

const SummaryRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 0;
  
  &:not(:last-child) {
    border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  }
`;

const EmptyCart = styled.div`
  text-align: center;
  padding: 4rem 2rem;
  background: ${({ theme }) => theme.colors.background};
  border-radius: 0.5rem;
  box-shadow: 0 2px 8px ${({ theme }) => theme.colors.shadow};
`;

export default function CartPage() {
  const { 
    cartItems, 
    updateQuantity, 
    removeFromCart, 
    getTotalPrice, 
    getTotalItems,
    clearCart 
  } = useCart();

  const totalItems = getTotalItems();
  const totalPrice = getTotalPrice();
  const { theme } = useTheme();

  if (cartItems.length === 0) {
    return (
      <Container>
        <Header>
          <Typography variant="h1" color={theme === 'light' ? 'dark' : 'light'} weight="bold">
            Shopping Cart
          </Typography>
        </Header>
        <EmptyCart>
          <Typography variant="h3" color={theme === 'light' ? 'dark' : 'light'} align="center">
            Your cart is empty
          </Typography>
          <Typography variant="body1" color={theme === 'light' ? 'dark' : 'light'} align="center">
            Start shopping to add items to your cart.
          </Typography>
          <Link href="/">
            <Button variant="primary" style={{ marginTop: '1rem' }}>
              Continue Shopping
            </Button>
          </Link>
        </EmptyCart>
      </Container>
    );
  }

  return (
    <Container>
      <Header>
        <Typography variant="h1" color={theme === 'light' ? 'dark' : 'light'} weight="bold">
          Shopping Cart ({totalItems} items)
        </Typography>
      </Header>

      <CartContainer>
        <CartItems>
          {cartItems.map((item) => (
            <CartItem key={item.id}>
              <ItemImage>
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  style={{ objectFit: 'contain' }}
                />
              </ItemImage>
              
              <ItemInfo>
                <ItemTitle href={`/products/${item.id}`}>
                  {item.title}
                </ItemTitle>
                <Typography variant="body2" color={theme === 'light' ? 'dark' : 'light'}>
                  ${item.price.toFixed(2)} each
                </Typography>
              </ItemInfo>

              <QuantityControls>
                <QuantityButton
                  variant="secondary"
                  size="small"
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  disabled={item.quantity <= 1}
                >
                  -
                </QuantityButton>
                <QuantityDisplay>{item.quantity}</QuantityDisplay>
                <QuantityButton
                  variant="secondary"
                  size="small"
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                >
                  +
                </QuantityButton>
                <Button
                  variant="danger"
                  size="small"
                  onClick={() => removeFromCart(item.id)}
                >
                  Remove
                </Button>
              </QuantityControls>

              <ItemPrice>
                <Typography variant="h6" color={theme === 'light' ? 'dark' : 'light'} weight="bold">
                  ${(item.price * item.quantity).toFixed(2)}
                </Typography>
              </ItemPrice>
            </CartItem>
          ))}
        </CartItems>

        <CartSummary>
          <Typography variant="h5" color={theme === 'light' ? 'dark' : 'light'} weight="bold" style={{ marginBottom: '1rem' }}>
            Order Summary
          </Typography>
          
          <SummaryRow>
            <Typography variant="body1" color={theme === 'light' ? 'dark' : 'light'}>
              Items ({totalItems})
            </Typography>
            <Typography variant="body1" color={theme === 'light' ? 'dark' : 'light'} weight="medium">
              ${totalPrice.toFixed(2)}
            </Typography>
          </SummaryRow>
          
          <SummaryRow>
            <Typography variant="body1" color={theme === 'light' ? 'dark' : 'light'}>
              Shipping
            </Typography>
            <Typography variant="body1" color={theme === 'light' ? 'dark' : 'light'} weight="medium">
              Free
            </Typography>
          </SummaryRow>
          
          <SummaryRow>
            <Typography variant="h6" color={theme === 'light' ? 'dark' : 'light'} weight="bold">
              Total
            </Typography>
            <Typography variant="h6" color="primary" weight="bold">
              ${totalPrice.toFixed(2)}
            </Typography>
          </SummaryRow>

          <Button 
            variant="success" 
            fullWidth 
            style={{ marginTop: '1rem', marginBottom: '0.5rem' }}
          >
            Proceed to Checkout
          </Button>
          
          <Button 
            variant="secondary" 
            fullWidth 
            onClick={clearCart}
          >
            Clear Cart
          </Button>
          
          <Link href="/">
            <Button 
              variant="outline" 
              fullWidth 
              style={{ marginTop: '0.5rem' }}
            >
              Continue Shopping
            </Button>
          </Link>
        </CartSummary>
      </CartContainer>
    </Container>
  );
}
