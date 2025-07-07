'use client';

import React from 'react';
import styled from 'styled-components';
import { Product } from '@/types';
import ProductCard from './ProductCard';

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
  color: #666;
`;

const EmptyTitle = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: #333;
`;

const EmptyDescription = styled.p`
  font-size: 1rem;
  line-height: 1.6;
`;

interface ProductGridProps {
  products: Product[];
  loading?: boolean;
}

export default function ProductGrid({ products, loading = false }: ProductGridProps) {
  if (loading) {
    return (
      <Grid>
        {Array.from({ length: 8 }).map((_, index) => (
          <div key={index} style={{ height: '400px', background: '#f0f0f0', borderRadius: '0.5rem' }} />
        ))}
      </Grid>
    );
  }

  if (products.length === 0) {
    return (
      <Grid>
        <EmptyState>
          <EmptyTitle>No products found</EmptyTitle>
          <EmptyDescription>
            Try adjusting your search criteria or filters to find what you're looking for.
          </EmptyDescription>
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
