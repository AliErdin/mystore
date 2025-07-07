import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SearchBox from '../SearchBox';

jest.useFakeTimers();

describe('SearchBox', () => {
  const mockOnSearch = jest.fn();

  beforeEach(() => {
    mockOnSearch.mockClear();
    jest.clearAllTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
  });

  it('renders search input and button', () => {
    render(<SearchBox onSearch={mockOnSearch} />);
    
    expect(screen.getByRole('searchbox')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /search/i })).toBeInTheDocument();
  });

  it('applies custom placeholder', () => {
    render(<SearchBox placeholder="Search products..." onSearch={mockOnSearch} />);
    
    expect(screen.getByPlaceholderText('Search products...')).toBeInTheDocument();
  });

  it('sets default value', () => {
    render(<SearchBox defaultValue="initial search" onSearch={mockOnSearch} />);
    
    const input = screen.getByRole('searchbox') as HTMLInputElement;
    expect(input.value).toBe('initial search');
  });

  it('handles input changes and debounces search', async () => {
    render(<SearchBox onSearch={mockOnSearch} debounceMs={300} />);
    
    const input = screen.getByRole('searchbox');
    
    fireEvent.change(input, { target: { value: 'test search' } });
    
    expect(mockOnSearch).not.toHaveBeenCalled();
    
    jest.advanceTimersByTime(300);
    
    expect(mockOnSearch).toHaveBeenCalledWith('test search');
  });

  it('cancels previous debounce when typing quickly', async () => {
    render(<SearchBox onSearch={mockOnSearch} debounceMs={300} />);
    
    const input = screen.getByRole('searchbox');
    
    fireEvent.change(input, { target: { value: 'first' } });
    
    jest.advanceTimersByTime(100);
    
    fireEvent.change(input, { target: { value: 'second' } });
    
    jest.advanceTimersByTime(300);
    
    expect(mockOnSearch).toHaveBeenCalledTimes(1);
    expect(mockOnSearch).toHaveBeenCalledWith('second');
  });

  it('handles form submission', () => {
    render(<SearchBox onSearch={mockOnSearch} />);
    
    const input = screen.getByRole('searchbox');
    const form = input.closest('form');
    
    fireEvent.change(input, { target: { value: 'submit search' } });
    fireEvent.submit(form!);
    
    expect(mockOnSearch).toHaveBeenCalledWith('submit search');
  });

  it('prevents default form submission', () => {
    render(<SearchBox onSearch={mockOnSearch} />);
    
    const input = screen.getByRole('searchbox');
    const form = input.closest('form');
    
    const submitEvent = new Event('submit', { bubbles: true, cancelable: true });
    const preventDefaultSpy = jest.spyOn(submitEvent, 'preventDefault');
    
    fireEvent(form!, submitEvent);
    
    expect(preventDefaultSpy).toHaveBeenCalled();
  });

  it('handles button click', () => {
    render(<SearchBox onSearch={mockOnSearch} />);
    
    const input = screen.getByRole('searchbox');
    const button = screen.getByRole('button', { name: /search/i });
    
    fireEvent.change(input, { target: { value: 'button search' } });
    fireEvent.click(button);
    
    expect(mockOnSearch).toHaveBeenCalledWith('button search');
  });

  it('uses custom debounce time', () => {
    render(<SearchBox onSearch={mockOnSearch} debounceMs={500} />);
    
    const input = screen.getByRole('searchbox');
    fireEvent.change(input, { target: { value: 'custom debounce' } });
    
    jest.advanceTimersByTime(300);
    expect(mockOnSearch).not.toHaveBeenCalled();
    
    jest.advanceTimersByTime(200);
    expect(mockOnSearch).toHaveBeenCalledWith('custom debounce');
  });
});
