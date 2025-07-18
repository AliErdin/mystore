'use client';

import React, { useState, useRef, useEffect, memo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styled from 'styled-components';
import { Product } from '@/types';
import { useCart } from '@/contexts/CartContext';
import Button from '@/components/atoms/Button';
import Typography from '@/components/atoms/Typography';
import dynamic from 'next/dynamic';
const Rating = dynamic(() => import('@/components/molecules/Rating'), { ssr: false });
import { useTranslations } from 'next-intl';

const Card = styled.div`
  background: ${({ theme }) => theme.colors.background};
  border-radius: 0.5rem;
  box-shadow: 0 2px 8px ${({ theme }) => theme.colors.shadow};
  overflow: hidden;
  transition: transform 0.2s, box-shadow 0.2s;
  height: 100%;
  display: flex;
  flex-direction: column;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 16px ${({ theme }) => theme.colors.shadow};
  }
`;

const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 200px;
  background: ${({ theme }) => theme.colors.background};
  img{
    padding: 1rem;
  }
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
  color: ${({ theme }) => theme.colors.text};
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

function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const t = useTranslations();
  const [added, setAdded] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
    setAdded(true);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setAdded(false), 1500);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <Card>
      <ImageContainer>
        <Image
          src={product.image}
          alt={product.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 200px"
          style={{ objectFit: 'contain' }}
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
            {added ? t('added_to_cart') : t('add_to_cart')}
          </Button>
        </PriceContainer>
      </CardContent>
    </Card>
  );
}

export default memo(ProductCard);
