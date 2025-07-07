import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Select from '../Select';

describe('Select', () => {
  const mockOptions = [
    { value: '', label: 'Select an option' },
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' },
  ];

  it('renders select element with options', () => {
    render(<Select options={mockOptions} />);
    
    const select = screen.getByRole('combobox');
    expect(select).toBeInTheDocument();
    
    mockOptions.forEach(option => {
      expect(screen.getByRole('option', { name: option.label })).toBeInTheDocument();
    });
  });

  it('handles value changes', () => {
    const handleChange = jest.fn();
    render(<Select options={mockOptions} onChange={handleChange} />);
    
    const select = screen.getByRole('combobox');
    fireEvent.change(select, { target: { value: 'option1' } });
    
    expect(handleChange).toHaveBeenCalledWith(expect.objectContaining({
      target: expect.objectContaining({ value: 'option1' })
    }));
  });

  it('sets default value correctly', () => {
    render(<Select options={mockOptions} defaultValue="option2" />);
    
    const select = screen.getByRole('combobox') as HTMLSelectElement;
    expect(select.value).toBe('option2');
  });

  it('handles controlled value', () => {
    const { rerender } = render(<Select options={mockOptions} value="option1" onChange={() => {}} />);
    
    const select = screen.getByRole('combobox') as HTMLSelectElement;
    expect(select.value).toBe('option1');
    
    rerender(<Select options={mockOptions} value="option3" onChange={() => {}} />);
    expect(select.value).toBe('option3');
  });

  it('handles disabled state', () => {
    render(<Select options={mockOptions} disabled />);
    
    const select = screen.getByRole('combobox');
    expect(select).toBeDisabled();
  });

  it('renders empty options array', () => {
    render(<Select options={[]} />);
    
    const select = screen.getByRole('combobox');
    expect(select).toBeInTheDocument();
    expect(select.children).toHaveLength(0);
  });

  it('applies custom props', () => {
    render(<Select options={mockOptions} name="test-select" id="test-id" />);
    
    const select = screen.getByRole('combobox');
    expect(select).toHaveAttribute('name', 'test-select');
    expect(select).toHaveAttribute('id', 'test-id');
  });
});
