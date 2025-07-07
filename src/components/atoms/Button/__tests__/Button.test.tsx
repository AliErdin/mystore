import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Button from '../Button';

describe('Button Component', () => {
  it('renders button with text', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument();
  });

  it('handles click events', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('applies variant styles', () => {
    const { rerender } = render(<Button variant="primary">Primary Button</Button>);
    let button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute('data-variant', 'primary');
    
    rerender(<Button variant="secondary">Secondary Button</Button>);
    button = screen.getByRole('button');
    expect(button).toHaveAttribute('data-variant', 'secondary');
    
    rerender(<Button variant="success">Success Button</Button>);
    button = screen.getByRole('button');
    expect(button).toHaveAttribute('data-variant', 'success');
    
    rerender(<Button variant="danger">Danger Button</Button>);
    button = screen.getByRole('button');
    expect(button).toHaveAttribute('data-variant', 'danger');
    
    rerender(<Button variant="outline">Outline Button</Button>);
    button = screen.getByRole('button');
    expect(button).toHaveAttribute('data-variant', 'outline');
  });
  
  it('uses default variant when not specified', () => {
    render(<Button>Default Button</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('data-variant', 'primary');
  });

  it('can be disabled', () => {
    render(<Button disabled>Disabled Button</Button>);
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
  });

  it('applies fullWidth prop', () => {
    render(<Button fullWidth>Full Width Button</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveStyle({
      width: '100%'
    });
  });
  
  it('does not apply fullWidth styles when fullWidth is false', () => {
    render(<Button fullWidth={false}>Not Full Width Button</Button>);
    const button = screen.getByRole('button');
    expect(button).not.toHaveStyle({
      width: '100%'
    });
  });

  it('applies different sizes', () => {
    const { rerender } = render(<Button size="small">Small Button</Button>);
    let button = screen.getByRole('button');
    expect(button).toHaveAttribute('data-size', 'small');
    
    rerender(<Button size="medium">Medium Button</Button>);
    button = screen.getByRole('button');
    expect(button).toHaveAttribute('data-size', 'medium');
    
    rerender(<Button size="large">Large Button</Button>);
    button = screen.getByRole('button');
    expect(button).toHaveAttribute('data-size', 'large');
  });
  
  it('uses default size when not specified', () => {
    render(<Button>Default Size Button</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('data-size', 'medium');
  });
  
  it('applies custom styles', () => {
    render(
      <Button 
        style={{ 
          marginTop: '10px',
          backgroundColor: 'purple'
        }}
      >
        Custom Style Button
      </Button>
    );
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute('style');
  });
  
  it('renders with correct button type', () => {
    const { rerender } = render(<Button type="submit">Submit</Button>);
    let button = screen.getByRole('button');
    expect(button).toHaveAttribute('type', 'submit');
    
    rerender(<Button type="reset">Reset</Button>);
    button = screen.getByRole('button');
    expect(button).toHaveAttribute('type', 'reset');
  });

  it('handles active state correctly', () => {
    render(<Button>Active Button</Button>);
    const button = screen.getByRole('button');
    
    fireEvent.mouseDown(button);
    expect(button).toBeInTheDocument();
    
    fireEvent.mouseUp(button);
  });
  
  it('combines multiple props correctly', () => {
    render(
      <Button 
        variant="success" 
        size="large" 
        fullWidth 
        disabled
      >
        Complex Button
      </Button>
    );
    
    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('data-variant', 'success');
    expect(button).toHaveAttribute('data-size', 'large');
    expect(button).toBeDisabled();
    expect(button).toHaveStyle({
      width: '100%'
    });
  });
});
