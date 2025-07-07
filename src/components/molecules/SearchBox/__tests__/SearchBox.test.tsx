import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SearchBox from '../SearchBox';



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
    render(<SearchBox onSearch={mockOnSearch} value="test" />);
    
    expect(screen.getByRole('searchbox')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /search/i })).toBeInTheDocument();
  });

  it('applies custom placeholder', () => {
    render(<SearchBox placeholder="Search products..." onSearch={mockOnSearch} value="test" />);
    
    expect(screen.getByPlaceholderText('Search products...')).toBeInTheDocument();
  });

  it('supports controlled value', () => {
    render(<SearchBox value="controlled" onSearch={mockOnSearch} />);
    const input = screen.getByRole('searchbox') as HTMLInputElement;
    expect(input.value).toBe('controlled');
    fireEvent.change(input, { target: { value: 'changed' } });
    expect(mockOnSearch).toHaveBeenCalledWith('changed');
  });

  it('handles form submission', () => {
    render(<SearchBox onSearch={mockOnSearch} value="test" />);
    
    const input = screen.getByRole('searchbox');
    const form = input.closest('form');
    
    fireEvent.change(input, { target: { value: 'submit search' } });
    fireEvent.submit(form!);
    
    expect(mockOnSearch).toHaveBeenCalledWith('submit search');
  });

  it('prevents default form submission', () => {
    render(<SearchBox onSearch={mockOnSearch} value="test" />);
    
    const input = screen.getByRole('searchbox');
    const form = input.closest('form');
    
    const submitEvent = new Event('submit', { bubbles: true, cancelable: true });
    const preventDefaultSpy = jest.spyOn(submitEvent, 'preventDefault');
    
    fireEvent(form!, submitEvent);
    
    expect(preventDefaultSpy).toHaveBeenCalled();
  });

  it('handles button click', () => {
    render(<SearchBox onSearch={mockOnSearch} value="test" />);
    
    const input = screen.getByRole('searchbox');
    const button = screen.getByRole('button', { name: /search/i });
    
    fireEvent.change(input, { target: { value: 'button search' } });
    fireEvent.click(button);
    
    expect(mockOnSearch).toHaveBeenCalledWith('button search');
  });

});
