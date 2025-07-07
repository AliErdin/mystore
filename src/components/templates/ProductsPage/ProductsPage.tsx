'use client';

import React from 'react';
import styled from 'styled-components';
import { Product } from '@/types';
import ProductFilters from '@/components/organisms/ProductFilters';
import ProductGrid from '@/components/organisms/ProductGrid';
import Pagination from '@/components/organisms/Pagination';
import Typography from '@/components/atoms/Typography';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  background: white;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const Header = styled.div`
  margin-bottom: 2rem;
`;

interface ProductsPageProps {
  products: Product[];
  categories: string[];
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
}

export default function ProductsPage({
  products,
  categories,
  currentPage,
  totalPages,
  totalItems,
  itemsPerPage,
}: ProductsPageProps) {
  return (
    <Container>
      <Header>
        <Typography variant="h1" color="dark" weight="bold">
          Products
        </Typography>
        <Typography variant="body1" color="secondary">
          Discover our amazing collection of products
        </Typography>
      </Header>

      <ProductFilters categories={categories} />
      
      <ProductGrid products={products} />
      
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        totalItems={totalItems}
        itemsPerPage={itemsPerPage}
      />
    </Container>
  );
}
