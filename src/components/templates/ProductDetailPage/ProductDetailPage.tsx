'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styled from 'styled-components';
import { Product } from '@/types';
import { useCart } from '@/contexts/CartContext';
import Button from '@/components/atoms/Button';
import Typography from '@/components/atoms/Typography';
import Badge from '@/components/atoms/Badge';
import Rating from '@/components/molecules/Rating';
import { useTheme } from '@/contexts/ThemeContext';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const Breadcrumb = styled.nav`
  margin-bottom: 2rem;
  color: ${({ theme }) => theme.colors.text};
`;

const BreadcrumbLink = styled(Link)`
  color: ${({ theme }) => theme.colors.primary};
  text-decoration: none;
  
  &:hover {
    text-decoration: underline;
  }
`;

const ProductContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  margin-bottom: 4rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 500px;
  background: ${({ theme }) => theme.colors.background};
  border-radius: 0.5rem;
  overflow: hidden;

  @media (max-width: 768px) {
    height: 300px;
  }
`;

const ProductInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const CategoryBadge = styled(Badge)`
  align-self: flex-start;
`;

const PriceSection = styled.div`
  padding: 1.5rem 0;
  border-top: 1px solid #e9ecef;
  border-bottom: 1px solid #e9ecef;
`;

const ActionSection = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;

  @media (max-width: 480px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

const QuantitySelector = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const QuantityButton = styled(Button)`
  min-width: 2.5rem;
  padding: 0.5rem;
`;

const QuantityDisplay = styled.span`
  min-width: 3rem;
  text-align: center;
  font-weight: 600;
  font-size: 1.1rem;
`;

interface ProductDetailPageProps {
  product: Product;
}

export default function ProductDetailPage({ product }: ProductDetailPageProps) {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const { theme } = useTheme();

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
    setQuantity(1);
  };

  const incrementQuantity = () => {
    setQuantity(prev => prev + 1);
  };

  const decrementQuantity = () => {
    setQuantity(prev => Math.max(1, prev - 1));
  };

  return (
    <Container>
      <Breadcrumb>
        <Typography variant="body2" color={theme === 'light' ? 'dark' : 'light'}>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
          {' > '}
          <BreadcrumbLink href={`/?category=${product.category}`}>
            {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
          </BreadcrumbLink>
          {' > '}
          {product.title}
        </Typography>
      </Breadcrumb>

      <ProductContainer>
        <ImageContainer>
          <Image
            src={product.image}
            alt={product.title}
            fill
            style={{ objectFit: 'contain' }}
            priority
          />
        </ImageContainer>

        <ProductInfo>
          <CategoryBadge variant="secondary">
            {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
          </CategoryBadge>

          <Typography variant="h1" color={theme === 'light' ? 'dark' : 'light'} weight="bold">
            {product.title}
          </Typography>

          <Rating 
            rating={product.rating.rate} 
            count={product.rating.count}
            size="medium"
          />

          <Typography variant="body1" color={theme === 'light' ? 'dark' : 'light'}>
            {product.description}
          </Typography>

          <PriceSection>
            <Typography variant="h2" color="primary" weight="bold">
              ${product.price.toFixed(2)}
            </Typography>
          </PriceSection>

          <ActionSection>
            <QuantitySelector>
              <Typography variant="body1" weight="medium">
                Quantity:
              </Typography>
              <QuantityButton
                variant="secondary"
                size="small"
                onClick={decrementQuantity}
                disabled={quantity <= 1}
              >
                -
              </QuantityButton>
              <QuantityDisplay>{quantity}</QuantityDisplay>
              <QuantityButton
                variant="secondary"
                size="small"
                onClick={incrementQuantity}
              >
                +
              </QuantityButton>
            </QuantitySelector>

            <Button
              variant="success"
              size="large"
              onClick={handleAddToCart}
            >
              Add {quantity} to Cart
            </Button>
          </ActionSection>
        </ProductInfo>
      </ProductContainer>
    </Container>
  );
}
