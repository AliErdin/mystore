'use client';

import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { useCart } from '@/contexts/CartContext';
import Typography from '@/components/atoms/Typography';
import Button from '@/components/atoms/Button';
import Badge from '@/components/atoms/Badge';

const HeaderContainer = styled.header`
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 100;
`;

const HeaderContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const Logo = styled(Link)`
  text-decoration: none;
  
  &:hover {
    opacity: 0.8;
  }
`;

const Nav = styled.nav`
  display: flex;
  align-items: center;
  gap: 2rem;

  @media (max-width: 768px) {
    gap: 1rem;
  }
`;

const NavLink = styled(Link)`
  color: #333;
  text-decoration: none;
  font-weight: 500;
  
  &:hover {
    color: #007bff;
  }
`;

const CartButtonContainer = styled.div`
  position: relative;
`;

export default function Header() {
  const { getTotalItems } = useCart();
  const totalItems = getTotalItems();

  return (
    <HeaderContainer>
      <HeaderContent>
        <Logo href="/">
          <Typography variant="h4" color="dark" weight="bold">
            My Store
          </Typography>
        </Logo>
        <Nav>
          <NavLink href="/">
            <Typography variant="body1" weight="medium">
              Products
            </Typography>
          </NavLink>
          <CartButtonContainer>
            <Button variant="primary" onClick={() => window.location.href = '/cart'}>
              Cart
            </Button>
            {totalItems > 0 && (
              <Badge variant="danger" position="top-right">
                {totalItems}
              </Badge>
            )}
          </CartButtonContainer>
        </Nav>
      </HeaderContent>
    </HeaderContainer>
  );
}
