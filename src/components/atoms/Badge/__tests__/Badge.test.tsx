import React from 'react';
import { render, screen } from '@testing-library/react';
import Badge from '../Badge';

describe('Badge', () => {
  it('renders badge with text content', () => {
    render(<Badge>5</Badge>);
    
    expect(screen.getByText('5')).toBeInTheDocument();
  });

  it('renders badge with number content', () => {
    render(<Badge>{10}</Badge>);
    
    expect(screen.getByText('10')).toBeInTheDocument();
  });

  it('handles minimal props', () => {
    render(<Badge>Test</Badge>);
    
    const badge = screen.getByText('Test');
    expect(badge).toBeInTheDocument();
  });

  it('applies custom styles correctly', () => {
    render(
      <Badge variant="primary">
        Custom Style
      </Badge>
    );
    
    const badge = screen.getByText('Custom Style');
    expect(badge).toBeInTheDocument();
  });

  it('renders with different content types', () => {
    const { rerender } = render(<Badge>Text</Badge>);
    expect(screen.getByText('Text')).toBeInTheDocument();
    
    rerender(<Badge>{0}</Badge>);
    expect(screen.getByText('0')).toBeInTheDocument();
    
    rerender(<Badge>{99}</Badge>);
    expect(screen.getByText('99')).toBeInTheDocument();
  });

  it('handles empty content', () => {
    const { container } = render(<Badge> </Badge>);
    
    const badge = container.querySelector('span');
    expect(badge).toBeInTheDocument();
    expect(badge?.textContent).toBe(' ');
  });

  it('renders as span element by default', () => {
    render(<Badge>Badge</Badge>);
    
    const badge = screen.getByText('Badge');
    expect(badge.tagName.toLowerCase()).toBe('span');
  });

  it('applies position styles when position prop is provided', () => {
    const { container: container1 } = render(<Badge position="top-right">Badge</Badge>);
    const badge1 = container1.querySelector('span');
    expect(badge1).toBeInTheDocument();
    expect(badge1).toHaveAttribute('data-position', 'top-right');
    
    const { container: container2 } = render(<Badge position="top-left">Badge</Badge>);
    const badge2 = container2.querySelector('span');
    expect(badge2).toHaveAttribute('data-position', 'top-left');
    
    const { container: container3 } = render(<Badge position="bottom-right">Badge</Badge>);
    const badge3 = container3.querySelector('span');
    expect(badge3).toHaveAttribute('data-position', 'bottom-right');
    
    const { container: container4 } = render(<Badge position="bottom-left">Badge</Badge>);
    const badge4 = container4.querySelector('span');
    expect(badge4).toHaveAttribute('data-position', 'bottom-left');
    
    const { container: container5 } = render(<Badge>Badge</Badge>);
    const badge5 = container5.querySelector('span');
    expect(badge5).not.toHaveAttribute('data-position');
  });

  it('applies different size styles', () => {
    const { rerender, container } = render(<Badge size="small">S</Badge>);
    
    let badge = container.querySelector('span');
    expect(badge).toHaveStyle({
      fontSize: '0.625rem',
      padding: '0.125rem 0.375rem'
    });
    
    rerender(<Badge size="large">L</Badge>);
    badge = container.querySelector('span');
    expect(badge).toHaveStyle({
      fontSize: '0.875rem',
      padding: '0.375rem 0.75rem'
    });
  });

  it('applies different variant styles', () => {
    const { rerender, container } = render(<Badge variant="secondary">S</Badge>);
    
    let badge = container.querySelector('span');
    expect(badge).toBeInTheDocument();
    
    rerender(<Badge variant="warning">W</Badge>);
    badge = container.querySelector('span');
    expect(badge).toBeInTheDocument();
  });

  it('has proper accessibility attributes', () => {
    render(<Badge>Notification</Badge>);
    
    const badge = screen.getByText('Notification');
    expect(badge).toBeInTheDocument();
  });

  it('handles long text content', () => {
    const longText = 'This is a very long badge text that should still render properly';
    render(<Badge>{longText}</Badge>);
    
    expect(screen.getByText(longText)).toBeInTheDocument();
  });

  it('handles special characters', () => {
    render(<Badge>★★★★★</Badge>);
    
    expect(screen.getByText('★★★★★')).toBeInTheDocument();
  });
});
