'use client';

import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { useCart } from '@/contexts/CartContext';

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
  font-size: 1.5rem;
  font-weight: bold;
  color: #333;
  text-decoration: none;
  
  &:hover {
    color: #007bff;
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

const CartButton = styled(Link)`
  position: relative;
  background-color: #007bff;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
  text-decoration: none;
  font-weight: 500;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: #0056b3;
  }
`;

const CartBadge = styled.span`
  position: absolute;
  top: -0.5rem;
  right: -0.5rem;
  background-color: #dc3545;
  color: white;
  border-radius: 50%;
  width: 1.25rem;
  height: 1.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
  font-weight: bold;
`;

export default function Header() {
  const { getTotalItems } = useCart();
  const totalItems = getTotalItems();

  return (
    <HeaderContainer>
      <HeaderContent>
        <Logo href="/">My Store</Logo>
        <Nav>
          <NavLink href="/">Products</NavLink>
          <CartButton href="/cart">
            Cart
            {totalItems > 0 && <CartBadge>{totalItems}</CartBadge>}
          </CartButton>
        </Nav>
      </HeaderContent>
    </HeaderContainer>
  );
}
