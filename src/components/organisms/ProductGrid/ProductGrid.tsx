'use client';

import React from 'react';
import styled from 'styled-components';
import { Product } from '@/types';
import ProductCard from '@/components/organisms/ProductCard';
import Typography from '@/components/atoms/Typography';

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

export default function ProductGrid({ products, loading = false }: ProductGridProps) {
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
          <Typography variant="h3" color="dark" align="center">
            No products found
          </Typography>
          <Typography variant="body1" color="secondary" align="center">
            Try adjusting your search criteria or filters to find what you&apos;re looking for.
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
