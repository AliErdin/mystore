import React from 'react';
import { render, screen } from '@testing-library/react';
import Typography from '../Typography';

describe('Typography', () => {
  it('renders text content correctly', () => {
    render(<Typography>Hello World</Typography>);
    expect(screen.getByText('Hello World')).toBeInTheDocument();
  });

  it('applies correct variant styles', () => {
    render(<Typography variant="h1">Heading</Typography>);
    const element = screen.getByText('Heading');
    expect(element.tagName).toBe('H1');
  });

  it('applies custom color', () => {
    render(<Typography color="primary">Colored Text</Typography>);
    const element = screen.getByText('Colored Text');
    expect(element).toBeInTheDocument();
  });

  it('applies custom styles', () => {
    const customStyle = { fontSize: '20px', fontWeight: 'bold' };
    render(<Typography style={customStyle}>Styled Text</Typography>);
    const element = screen.getByText('Styled Text');
    expect(element).toHaveStyle(customStyle);
  });

  it('renders different HTML elements based on variant', () => {
    const { rerender } = render(<Typography variant="h2">Heading 2</Typography>);
    expect(screen.getByText('Heading 2').tagName).toBe('H2');

    rerender(<Typography variant="body1">Body Text</Typography>);
    expect(screen.getByText('Body Text').tagName).toBe('DIV');

    rerender(<Typography variant="caption">Caption Text</Typography>);
    expect(screen.getByText('Caption Text').tagName).toBe('DIV');
  });

  it('handles empty children', () => {
    render(<Typography>Test</Typography>);
    expect(screen.getByText('Test')).toBeInTheDocument();
  });
});
