'use client';

import React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import styled from 'styled-components';

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  margin: 2rem 0;
`;

const PageButton = styled.button<{ $active?: boolean; $disabled?: boolean }>`
  padding: 0.5rem 0.75rem;
  border: 1px solid #ddd;
  background: ${props => props.$active ? '#007bff' : 'white'};
  color: ${props => props.$active ? 'white' : props.$disabled ? '#999' : '#333'};
  border-radius: 0.25rem;
  cursor: ${props => props.$disabled ? 'not-allowed' : 'pointer'};
  font-size: 0.875rem;
  min-width: 2.5rem;
  
  &:hover:not(:disabled) {
    background: ${props => props.$active ? '#0056b3' : '#f8f9fa'};
    border-color: ${props => props.$active ? '#0056b3' : '#007bff'};
  }
  
  &:disabled {
    opacity: 0.5;
  }
`;

const PageInfo = styled.span`
  margin: 0 1rem;
  color: #666;
  font-size: 0.875rem;

  @media (max-width: 480px) {
    display: none;
  }
`;

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
}

export default function Pagination({ 
  currentPage, 
  totalPages, 
  totalItems, 
  itemsPerPage 
}: PaginationProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const goToPage = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    
    if (page === 1) {
      params.delete('page');
    } else {
      params.set('page', page.toString());
    }
    
    router.push(`/?${params.toString()}`);
  };

  const getVisiblePages = () => {
    const pages = [];
    const maxVisible = 5;
    
    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      const start = Math.max(1, currentPage - 2);
      const end = Math.min(totalPages, start + maxVisible - 1);
      
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
      
      if (start > 1) {
        pages.unshift('...');
        pages.unshift(1);
      }
      
      if (end < totalPages) {
        pages.push('...');
        pages.push(totalPages);
      }
    }
    
    return pages;
  };

  if (totalPages <= 1) return null;

  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  return (
    <PaginationContainer>
      <PageButton
        onClick={() => goToPage(currentPage - 1)}
        disabled={currentPage === 1}
        $disabled={currentPage === 1}
      >
        ←
      </PageButton>
      
      {getVisiblePages().map((page, index) => (
        <PageButton
          key={index}
          onClick={() => typeof page === 'number' ? goToPage(page) : undefined}
          $active={page === currentPage}
          disabled={typeof page !== 'number'}
          $disabled={typeof page !== 'number'}
        >
          {page}
        </PageButton>
      ))}
      
      <PageButton
        onClick={() => goToPage(currentPage + 1)}
        disabled={currentPage === totalPages}
        $disabled={currentPage === totalPages}
      >
        →
      </PageButton>
      
      <PageInfo>
        Showing {startItem}-{endItem} of {totalItems} products
      </PageInfo>
    </PaginationContainer>
  );
}
