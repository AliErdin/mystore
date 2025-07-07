'use client';

import React, { useCallback, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import styled from 'styled-components';
import FilterGroup from '@/components/molecules/FilterGroup';
import SearchBox from '@/components/molecules/SearchBox';
import { useTranslation } from 'react-i18next';
import PriceRange from '@/components/molecules/PriceRange';
import Select from '@/components/atoms/Select';
import Button from '@/components/atoms/Button';

const FiltersContainer = styled.div`
  background: white;
  padding: 1.5rem;
  border-radius: 0.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
`;

const FiltersGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  align-items: end;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

interface ProductFiltersProps {
  categories: string[];
}

export default function ProductFilters({ categories }: ProductFiltersProps) {
  const { t } = useTranslation();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [search, setSearch] = useState(searchParams.get('search') || '');

  useEffect(() => {
    setSearch(searchParams.get('search') || '');
  }, [searchParams]);

  const updateFilters = useCallback((key: string, value: string) => {
  const params = new URLSearchParams(searchParams.toString());

  if (value) {
    params.set(key, value);
  } else {
    params.delete(key);
  }

  if(key !== 'page'){
    params.delete('page');
  }

  router.push(`/?${params.toString()}`);
}, [router, searchParams]);

  const clearFilters = () => {
    router.push('/');
  };

  const handleSearch = useCallback((value: string) => {
    setSearch(value);
    updateFilters('search', value);
  }, [updateFilters]);

  const handleMinPriceChange = useCallback((value: string) => {
    updateFilters('minPrice', value);
  }, [updateFilters]);

  const handleMaxPriceChange = useCallback((value: string) => {
    updateFilters('maxPrice', value);
  }, [updateFilters]);

  const categoryOptions = [
    { value: '', label: t('all_categories') },
    ...categories.map((category) => ({
      value: category,
      label: category.charAt(0).toUpperCase() + category.slice(1),
    })),
  ];

  const sortOptions = [
    { value: '', label: t('default') },
    { value: 'price-asc', label: t('price_low_to_high') },
    { value: 'price-desc', label: t('price_high_to_low') },
    { value: 'rating', label: t('rating') },
    { value: 'title', label: t('title_az') },
  ];

  return (
    <FiltersContainer>
      <FiltersGrid>
        <FilterGroup label={t('search_products')}>
          <SearchBox
            placeholder={t('search_by_title')}
            value={search}
            onSearch={handleSearch}
          />
        </FilterGroup>

        <FilterGroup label={t('category')}>
          <Select
            options={categoryOptions}
            defaultValue={searchParams.get('category') || ''}
            onChange={(e) => updateFilters('category', e.target.value)}
          />
        </FilterGroup>

        <FilterGroup label={t('sort_by')}>
          <Select
            options={sortOptions}
            defaultValue={searchParams.get('sortBy') || ''}
            onChange={(e) => updateFilters('sortBy', e.target.value)}
          />
        </FilterGroup>

        <FilterGroup label={t('price_range')}>
          <PriceRange
            minValue={searchParams.get('minPrice') || ''}
            maxValue={searchParams.get('maxPrice') || ''}
            onMinChange={handleMinPriceChange}
            onMaxChange={handleMaxPriceChange}
          />
        </FilterGroup>

        <FilterGroup label="">
          <Button variant="secondary" onClick={clearFilters}>
            {t('clear_filters')}
          </Button>
        </FilterGroup>
      </FiltersGrid>
    </FiltersContainer>
  );
}