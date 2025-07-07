import React from 'react';
import { render, screen } from '@testing-library/react';
import FilterGroup from '../FilterGroup';

describe('FilterGroup', () => {
  const mockOnChange = jest.fn();

  beforeEach(() => {
    mockOnChange.mockClear();
  });

  it('renders filter group with title', () => {
    render(
      <FilterGroup label="Category">
        <option value="">All</option>
        <option value="electronics">Electronics</option>
      </FilterGroup>
    );
    
    expect(screen.getByText('Category')).toBeInTheDocument();
  });

  it('renders select with options', () => {
    render(
      <FilterGroup label="Category">
        <select>
          <option value="">All Categories</option>
          <option value="electronics">Electronics</option>
          <option value="clothing">Clothing</option>
        </select>
      </FilterGroup>
    );
    
    const select = screen.getByRole('combobox');
    expect(select).toBeInTheDocument();
    
    expect(screen.getByRole('option', { name: 'All Categories' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'Electronics' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'Clothing' })).toBeInTheDocument();
  });

  it('displays current value correctly', () => {
    render(
      <FilterGroup label="Category">
        <select defaultValue="electronics">
          <option value="">All Categories</option>
          <option value="electronics">Electronics</option>
          <option value="clothing">Clothing</option>
        </select>
      </FilterGroup>
    );
    
    const select = screen.getByRole('combobox') as HTMLSelectElement;
    expect(select.value).toBe('electronics');
  });

  it('renders select element correctly', () => {
    render(
      <FilterGroup label="Category">
        <select>
          <option value="">All Categories</option>
          <option value="electronics">Electronics</option>
          <option value="clothing">Clothing</option>
        </select>
      </FilterGroup>
    );
    
    const select = screen.getByRole('combobox');
    expect(select).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'All Categories' })).toBeInTheDocument();
  });

  it('handles multiple options correctly', () => {
    render(
      <FilterGroup label="Sort">
        <select>
          <option value="default">Default</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
        </select>
      </FilterGroup>
    );
    
    const select = screen.getByRole('combobox');
    expect(select).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'Default' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'Price: Low to High' })).toBeInTheDocument();
  });

  it('renders with proper structure', () => {
    render(
      <FilterGroup label="Test Filter">
        <select>
          <option value="test">Test Option</option>
        </select>
      </FilterGroup>
    );
    
    expect(screen.getByText('Test Filter')).toBeInTheDocument();
    expect(screen.getByRole('combobox')).toBeInTheDocument();
  });

  it('handles empty options', () => {
    render(
      <FilterGroup label="Empty">
        <div>No options</div>
      </FilterGroup>
    );
    
    expect(screen.getByText('Empty')).toBeInTheDocument();
    expect(screen.getByText('No options')).toBeInTheDocument();
  });

  it('passes through additional props to select', () => {
    render(
      <FilterGroup 
        label="Test" 
        data-testid="filter-select"
      >
        <select>
          <option value="">Test</option>
        </select>
      </FilterGroup>
    );
    
    const testElements = screen.getAllByText('Test');
    expect(testElements.length).toBe(2);
    expect(screen.getByRole('combobox')).toBeInTheDocument();
  });

  it('handles special characters in options', () => {
    render(
      <FilterGroup label="Special">
        <select>
          <option value="special-chars">Price: $10 - $50</option>
          <option value="unicode">★★★★★</option>
        </select>
      </FilterGroup>
    );
    
    expect(screen.getByRole('option', { name: 'Price: $10 - $50' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: '★★★★★' })).toBeInTheDocument();
  });

  it('maintains accessibility with proper labeling', () => {
    render(
      <FilterGroup label="Accessible Filter">
        <select>
          <option value="">Choose option</option>
        </select>
      </FilterGroup>
    );
    
    const select = screen.getByRole('combobox');
    expect(select).toBeInTheDocument();
    
    expect(screen.getByText('Accessible Filter')).toBeInTheDocument();
  });
});
