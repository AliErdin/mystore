import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import PriceRange from '../PriceRange';

beforeAll(() => { jest.useFakeTimers(); });
afterAll(() => { jest.useRealTimers(); });

describe('PriceRange', () => {
  const mockOnMinChange = jest.fn();
  const mockOnMaxChange = jest.fn();

  beforeEach(() => {
    mockOnMinChange.mockClear();
    mockOnMaxChange.mockClear();
  });

  it('renders min and max price inputs', () => {
    render(
      <PriceRange 
        onMinChange={mockOnMinChange} 
        onMaxChange={mockOnMaxChange} 
      />
    );
    
    const inputs = screen.getAllByRole('spinbutton');
    expect(inputs).toHaveLength(2);
    
    expect(screen.getByPlaceholderText('Min')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Max')).toBeInTheDocument();
  });

  it('displays separator between inputs', () => {
    render(
      <PriceRange 
        onMinChange={mockOnMinChange} 
        onMaxChange={mockOnMaxChange} 
      />
    );
    
    expect(screen.getByText('-')).toBeInTheDocument();
  });

  it('sets initial values correctly', () => {
    render(
      <PriceRange 
        minValue="10.50"
        maxValue="99.99"
        onMinChange={mockOnMinChange} 
        onMaxChange={mockOnMaxChange} 
      />
    );
    
    const minInput = screen.getByPlaceholderText('Min') as HTMLInputElement;
    const maxInput = screen.getByPlaceholderText('Max') as HTMLInputElement;
    
    expect(minInput.value).toBe('10.50');
    expect(maxInput.value).toBe('99.99');
  });

  it('handles min price changes', () => {
    render(
      <PriceRange 
        onMinChange={mockOnMinChange} 
        onMaxChange={mockOnMaxChange} 
      />
    );
    
    const minInput = screen.getByPlaceholderText('Min');
    fireEvent.change(minInput, { target: { value: '25.00' } });
    jest.advanceTimersByTime(400);
    expect(mockOnMinChange).toHaveBeenCalledWith('25.00');
  });

  it('handles max price changes', () => {
    render(
      <PriceRange 
        onMinChange={mockOnMinChange} 
        onMaxChange={mockOnMaxChange} 
      />
    );
    
    const maxInput = screen.getByPlaceholderText('Max');
    fireEvent.change(maxInput, { target: { value: '150.00' } });
    jest.advanceTimersByTime(400);
    expect(mockOnMaxChange).toHaveBeenCalledWith('150.00');
  });

  it('applies correct input attributes', () => {
    render(
      <PriceRange 
        onMinChange={mockOnMinChange} 
        onMaxChange={mockOnMaxChange} 
      />
    );
    
    const inputs = screen.getAllByRole('spinbutton');
    
    inputs.forEach(input => {
      expect(input).toHaveAttribute('type', 'number');
      expect(input).toHaveAttribute('min', '0');
      expect(input).toHaveAttribute('step', '0.01');
    });
  });

  it('handles empty values', () => {
    render(
      <PriceRange 
        minValue=""
        maxValue=""
        onMinChange={mockOnMinChange} 
        onMaxChange={mockOnMaxChange} 
      />
    );
    
    const minInput = screen.getByPlaceholderText('Min') as HTMLInputElement;
    const maxInput = screen.getByPlaceholderText('Max') as HTMLInputElement;
    
    expect(minInput.value).toBe('');
    expect(maxInput.value).toBe('');
  });

  it('handles decimal values', () => {
    render(
      <PriceRange 
        onMinChange={mockOnMinChange} 
        onMaxChange={mockOnMaxChange} 
      />
    );
    
    const minInput = screen.getByPlaceholderText('Min');
    const maxInput = screen.getByPlaceholderText('Max');
    
    fireEvent.change(minInput, { target: { value: '19.99' } });
    fireEvent.change(maxInput, { target: { value: '299.95' } });
    jest.advanceTimersByTime(400);
    expect(mockOnMinChange).toHaveBeenCalledWith('19.99');
    expect(mockOnMaxChange).toHaveBeenCalledWith('299.95');
  });
  it('handles zero values', () => {
    render(
      <PriceRange 
        onMinChange={mockOnMinChange} 
        onMaxChange={mockOnMaxChange} 
      />
    );
    
    const minInput = screen.getByPlaceholderText('Min');
    fireEvent.change(minInput, { target: { value: '0' } });
    jest.advanceTimersByTime(400);
    expect(mockOnMinChange).toHaveBeenCalledWith('0');
  });
});
