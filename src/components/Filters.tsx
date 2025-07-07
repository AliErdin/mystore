'use client';

import React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import styled from 'styled-components';

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

const FilterGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  font-weight: 500;
  color: #333;
  font-size: 0.875rem;
`;

const Select = styled.select`
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 0.25rem;
  font-size: 0.875rem;
  background: white;
  
  &:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
  }
`;

const Input = styled.input`
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 0.25rem;
  font-size: 0.875rem;
  
  &:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
  }
`;

const PriceRangeContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
`;

const ClearButton = styled.button`
  background: #6c757d;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
  cursor: pointer;
  font-size: 0.875rem;
  
  &:hover {
    background: #5a6268;
  }
`;

interface FiltersProps {
  categories: string[];
}

export default function Filters({ categories }: FiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const updateFilters = (key: string, value: string) => {
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
  };

  const clearFilters = () => {
    router.push('/');
  };

  return (
    <FiltersContainer>
      <FiltersGrid>
        <FilterGroup>
          <Label htmlFor="search">Search Products</Label>
          <Input
            id="search"
            type="text"
            placeholder="Search by title..."
            defaultValue={searchParams.get('search') || ''}
            onChange={(e) => updateFilters('search', e.target.value)}
          />
        </FilterGroup>

        <FilterGroup>
          <Label htmlFor="category">Category</Label>
          <Select
            id="category"
            defaultValue={searchParams.get('category') || ''}
            onChange={(e) => updateFilters('category', e.target.value)}
          >
            <option value="">All Categories</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </option>
            ))}
          </Select>
        </FilterGroup>

        <FilterGroup>
          <Label htmlFor="sortBy">Sort By</Label>
          <Select
            id="sortBy"
            defaultValue={searchParams.get('sortBy') || ''}
            onChange={(e) => updateFilters('sortBy', e.target.value)}
          >
            <option value="">Default</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="rating">Rating</option>
            <option value="title">Title A-Z</option>
          </Select>
        </FilterGroup>

        <FilterGroup>
          <Label>Price Range</Label>
          <PriceRangeContainer>
            <Input
              type="number"
              placeholder="Min"
              min="0"
              step="0.01"
              defaultValue={searchParams.get('minPrice') || ''}
              onChange={(e) => updateFilters('minPrice', e.target.value)}
            />
            <span>-</span>
            <Input
              type="number"
              placeholder="Max"
              min="0"
              step="0.01"
              defaultValue={searchParams.get('maxPrice') || ''}
              onChange={(e) => updateFilters('maxPrice', e.target.value)}
            />
          </PriceRangeContainer>
        </FilterGroup>

        <FilterGroup>
          <ClearButton onClick={clearFilters}>
            Clear Filters
          </ClearButton>
        </FilterGroup>
      </FiltersGrid>
    </FiltersContainer>
  );
}
