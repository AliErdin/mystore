import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ProductFilters from '../ProductFilters';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key: string) => {
    if (key === 'search_by_title') return 'Search by title';
    if (key === 'all_categories') return 'All Categories';
    if (key === 'default') return 'Default';
    if (key === 'price_range') return 'Price Range';
    if (key === 'clear_filters') return 'Clear Filters';
    if (key === 'price_asc' || key === 'price_low_to_high') return 'Price: Low to High';
    if (key === 'price_desc' || key === 'price_high_to_low') return 'Price: High to Low';
    if (key === 'rating') return 'Rating';
    if (key === 'title_az') return 'Title A-Z';
    if (key === 'search_products') return 'Search Products';
    if (key === 'category') return 'Category';
    if (key === 'sort_by') return 'Sort by';
    return key;
  } })
}));

const mockPush = jest.fn();
const mockSearchParams = new URLSearchParams();

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
  useSearchParams: () => mockSearchParams,
}));

jest.useFakeTimers();

const mockCategories = ['electronics', 'clothing', 'books', 'home'];

describe('ProductFilters', () => {
  beforeEach(() => {
    mockPush.mockClear();
    for (const key of Array.from(mockSearchParams.keys())) {
      mockSearchParams.delete(key);
    }
    jest.clearAllTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
  });

  it('renders all filter components', () => {
    render(<ProductFilters categories={mockCategories} />);
    
    expect(screen.getByPlaceholderText(/search by title/i)).toBeInTheDocument();
    expect(screen.getByDisplayValue('All Categories')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Default')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Min')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Max')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /clear filters/i })).toBeInTheDocument();
  });

  it('renders category options correctly', () => {
    render(<ProductFilters categories={mockCategories} />);
    
    const categorySelect = screen.getByDisplayValue('All Categories');
    expect(categorySelect).toBeInTheDocument();
    
    mockCategories.forEach(category => {
      const capitalizedCategory = category.charAt(0).toUpperCase() + category.slice(1);
      expect(screen.getByRole('option', { name: capitalizedCategory })).toBeInTheDocument();
    });
  });

  it('handles search input with debounce', async () => {
    render(<ProductFilters categories={mockCategories} />);
    
    const searchInput = screen.getByPlaceholderText(/search by title/i);
    fireEvent.change(searchInput, { target: { value: 'test search' } });
    
    jest.advanceTimersByTime(400);
    
    expect(mockPush).toHaveBeenCalledWith('/?search=test+search');
  });

  it('handles category selection', () => {
    render(<ProductFilters categories={mockCategories} />);
    
    const categorySelect = screen.getByDisplayValue('All Categories');
    fireEvent.change(categorySelect, { target: { value: 'electronics' } });
    
    expect(mockPush).toHaveBeenCalledWith('/?category=electronics');
  });

  it('handles sort selection', () => {
    render(<ProductFilters categories={mockCategories} />);
    
    const sortSelect = screen.getByDisplayValue('Default');
    fireEvent.change(sortSelect, { target: { value: 'price-asc' } });
    
    expect(mockPush).toHaveBeenCalledWith('/?sortBy=price-asc');
  });

  it('handles price range changes', () => {
    render(<ProductFilters categories={mockCategories} />);
    
    const minPriceInput = screen.getByPlaceholderText('Min');
    const maxPriceInput = screen.getByPlaceholderText('Max');
    
    fireEvent.change(minPriceInput, { target: { value: '10' } });
    jest.advanceTimersByTime(400);
    expect(mockPush).toHaveBeenCalledWith('/?minPrice=10');
    
    fireEvent.change(maxPriceInput, { target: { value: '100' } });
    jest.advanceTimersByTime(400);
    expect(mockPush).toHaveBeenCalledWith('/?maxPrice=100');
  });

  it('handles clear filters button', () => {
    render(<ProductFilters categories={mockCategories} />);
    
    const clearButton = screen.getByRole('button', { name: /clear filters/i });
    fireEvent.click(clearButton);
    
    expect(mockPush).toHaveBeenCalledWith('/');
  });

  it('resets page when filters change', () => {
    mockSearchParams.set('page', '3');
    
    render(<ProductFilters categories={mockCategories} />);
    
    const categorySelect = screen.getByDisplayValue('All Categories');
    fireEvent.change(categorySelect, { target: { value: 'electronics' } });
    
    expect(mockPush).toHaveBeenCalledWith('/?category=electronics');
  });

  it('preserves existing filters when adding new ones', () => {
    mockSearchParams.set('category', 'electronics');
    mockSearchParams.set('search', 'phone');
    
    render(<ProductFilters categories={mockCategories} />);
    
    const sortSelect = screen.getByDisplayValue('Default');
    fireEvent.change(sortSelect, { target: { value: 'price-desc' } });
    
    expect(mockPush).toHaveBeenCalledWith('/?category=electronics&search=phone&sortBy=price-desc');
  });

  it('removes filter when empty value is selected', () => {
    mockSearchParams.set('category', 'electronics');
    
    render(<ProductFilters categories={mockCategories} />);
    
    const categorySelect = screen.getByDisplayValue('Electronics');
    fireEvent.change(categorySelect, { target: { value: '' } });
    
    expect(mockPush).toHaveBeenCalledWith('/?');
  });

  it('displays current filter values from URL params', () => {
    mockSearchParams.set('search', 'test query');
    mockSearchParams.set('category', 'electronics');
    mockSearchParams.set('sortBy', 'price-asc');
    mockSearchParams.set('minPrice', '10');
    mockSearchParams.set('maxPrice', '100');
    
    render(<ProductFilters categories={mockCategories} />);
    
    expect(screen.getByDisplayValue('test query')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Electronics')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Price: Low to High')).toBeInTheDocument();
    expect(screen.getByDisplayValue('10')).toBeInTheDocument();
    expect(screen.getByDisplayValue('100')).toBeInTheDocument();
  });

  it('handles search form submission', () => {
    render(<ProductFilters categories={mockCategories} />);
    
    const searchInput = screen.getByPlaceholderText(/search by title/i);
    const searchForm = searchInput.closest('form');
    
    fireEvent.change(searchInput, { target: { value: 'form submit test' } });
    fireEvent.submit(searchForm!);
    
    expect(mockPush).toHaveBeenCalledWith('/?search=form+submit+test');
  });

  // Skipped: SearchBox no longer debounces; this test is not relevant.
  it.skip('cancels previous search debounce when typing quickly', () => {
    render(<ProductFilters categories={mockCategories} />);
    
    const searchInput = screen.getByPlaceholderText(/search by title/i);
    
    fireEvent.change(searchInput, { target: { value: 'first' } });
    
    jest.advanceTimersByTime(100);
    
    fireEvent.change(searchInput, { target: { value: 'second' } });
    
    jest.advanceTimersByTime(400);
    
    expect(mockPush).toHaveBeenCalledTimes(1);
    expect(mockPush).toHaveBeenCalledWith('/?search=second');
  });

  it('renders with empty categories array', () => {
    render(<ProductFilters categories={[]} />);
    
    const categorySelect = screen.getByDisplayValue('All Categories');
    expect(categorySelect).toBeInTheDocument();
    
    const options = screen.getAllByRole('option');
    expect(options.length).toBeGreaterThan(0);
    expect(screen.getByText('All Categories')).toBeInTheDocument();
  });
});
