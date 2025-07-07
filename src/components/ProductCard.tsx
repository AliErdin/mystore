'use client';

import React from 'react';
import { useTranslation } from 'react-i18next';
import Link from 'next/link';
import Image from 'next/image';
import styled from 'styled-components';
import { Product } from '@/types';
import { useCart } from '@/contexts/CartContext';
import Button from '@/components/atoms/Button';
import Typography from '@/components/atoms/Typography';
import Rating from '@/components/molecules/Rating';

const Card = styled.div`
  background: white;
  border-radius: 0.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.2s, box-shadow 0.2s;
  height: 100%;
  display: flex;
  flex-direction: column;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
  }
`;

const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 200px;
  background: #f8f9fa;
`;

const CardContent = styled.div`
  padding: 1rem;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Title = styled(Link)`
  font-size: 1rem;
  font-weight: 600;
  color: #333;
  text-decoration: none;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  line-height: 1.4;
  
  &:hover {
    color: #007bff;
  }
`;

const PriceContainer = styled.div`
  margin-top: auto;
  padding-top: 0.5rem;
`;

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const { t, i18n } = useTranslation();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
  };

  return (
    <Card>
      <ImageContainer>
        <Image
          src={product.image}
          alt={product.title}
          fill
          style={{ objectFit: 'contain' }}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
        />
      </ImageContainer>
      <CardContent>
        <Title href={`/products/${product.id}`}>
          {product.title}
        </Title>
        <Rating 
          rating={product.rating.rate} 
          count={product.rating.count}
          size="small"
        />
        <PriceContainer>
          <Typography variant="h6" color="primary" weight="bold">
            {t('currency', { price: product.price.toFixed(2) })}
          </Typography>
          <Button 
            variant="success" 
            fullWidth 
            onClick={handleAddToCart}
          >
            {t('add_to_cart')}
          </Button>
        </PriceContainer>
      </CardContent>
    </Card>
  );
}
