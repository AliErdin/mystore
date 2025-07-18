'use client';

import React, { memo } from 'react';
import styled from 'styled-components';
import { Product } from '@/types';
import ProductCard from '@/components/organisms/ProductCard';
import Typography from '@/components/atoms/Typography';
import { useTranslations } from 'next-intl';
import { useTheme } from '@/contexts/ThemeContext';

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;
  margin-bottom: 2rem;

  @media (max-width: 1200px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const EmptyState = styled.div`
  grid-column: 1 / -1;
  text-align: center;
  padding: 4rem 2rem;
`;

const LoadingGrid = styled(Grid)`
  .loading-card {
    height: 400px;
    background: #f0f0f0;
    border-radius: 0.5rem;
    animation: pulse 1.5s ease-in-out infinite;
  }

  @keyframes pulse {
    0% {
      opacity: 1;
    }
    50% {
      opacity: 0.5;
    }
    100% {
      opacity: 1;
    }
  }
`;

interface ProductGridProps {
  products: Product[];
  loading?: boolean;
}

function ProductGrid({ products, loading = false }: ProductGridProps) {
  const t = useTranslations();
  const { theme } = useTheme();
  if (loading) {
    return (
      <LoadingGrid>
        {Array.from({ length: 8 }).map((_, index) => (
          <div key={index} className="loading-card" />
        ))}
      </LoadingGrid>
    );
  }

  if (products.length === 0) {
    return (
      <Grid>
        <EmptyState>
          <Typography variant="h3" color={theme === 'light' ? 'dark' : 'light'} align="center">
            {t('no_products_found')}
          </Typography>
          <Typography variant="body1" color={theme === 'light' ? 'dark' : 'light'} align="center">
            {t('no_products_found_desc')}
          </Typography>
        </EmptyState>
      </Grid>
    );
  }

  return (
    <Grid>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </Grid>
  );
}

export default memo(ProductGrid);
