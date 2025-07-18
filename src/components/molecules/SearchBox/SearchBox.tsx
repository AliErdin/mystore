'use client';

import React from 'react';
import styled from 'styled-components';
import Input from '@/components/atoms/Input';
import Button from '@/components/atoms/Button';

interface SearchBoxProps {
  placeholder?: string;
  value: string;
  onSearch: (value: string) => void;
}

const SearchContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  width: 100%;
`;

const SearchInputWrapper = styled.div`
  flex: 1;
`;

import { useTranslations } from 'next-intl';

export default function SearchBox({
  placeholder,
  value,
  onSearch,
}: SearchBoxProps) {
  const t = useTranslations();
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <SearchContainer>
        <SearchInputWrapper>
          <Input
            type="search"
            placeholder={placeholder || t('search_by_title')}
            value={value}
            onChange={(e) => onSearch(e.target.value)}
          />
        </SearchInputWrapper>
        <Button type="submit" variant="primary">
          {t('search_lbl')}
        </Button>
      </SearchContainer>
    </form>
  );
}
