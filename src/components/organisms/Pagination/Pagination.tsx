'use client';

import React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import styled from 'styled-components';
import Button from '@/components/atoms/Button';
import Typography from '@/components/atoms/Typography';
import { useTranslations } from 'next-intl';

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  margin: 2rem 0;
`;

const PageButton = styled(Button)`
  min-width: 2.5rem;
`;

const PageInfo = styled.div`
  margin: 0 1rem;

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
  const t = useTranslations();
  const router = useRouter();
  const searchParams = useSearchParams();

  const goToPage = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    
    params.set('page', page.toString());
    
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
      <Button
        variant="secondary"
        size="small"
        onClick={() => goToPage(currentPage - 1)}
        disabled={currentPage === 1}
      >
        ←
      </Button>
      
      {getVisiblePages().map((page, index) => (
        <PageButton
          key={index}
          variant={page === currentPage ? 'primary' : 'secondary'}
          size="small"
          onClick={() => typeof page === 'number' ? goToPage(page) : undefined}
          disabled={typeof page !== 'number'}
          aria-current={page === currentPage ? 'page' : undefined}
        >
          {page}
        </PageButton>
      ))}
      
      <Button
        variant="secondary"
        size="small"
        onClick={() => goToPage(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        →
      </Button>
      
      <PageInfo>
        <Typography variant="body2" color="secondary">
          {t('pagination_info', { startItem, endItem, totalItems })}
        </Typography>
      </PageInfo>
    </PaginationContainer>
  );
}
