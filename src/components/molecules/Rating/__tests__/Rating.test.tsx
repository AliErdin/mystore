import React from 'react';
import { render, screen } from '@testing-library/react';
import Rating from '../Rating';

describe('Rating', () => {
  it('renders rating stars correctly', () => {
    render(<Rating rating={4.5} />);
    
    const starsContainer = screen.getByText(/★/);
    expect(starsContainer).toBeInTheDocument();
  });

  it('displays rating count when showCount is true', () => {
    render(<Rating rating={4.2} count={150} showCount={true} />);
    
    const ratingElements = screen.getAllByText((content, element) => {
      return element?.textContent?.includes('150') || false;
    });
    expect(ratingElements.length).toBeGreaterThan(0);
  });

  it('hides rating count when showCount is false', () => {
    render(<Rating rating={4.2} count={150} showCount={false} />);
    
    const countElement = screen.queryByText((content, element) => {
      return element?.textContent?.includes('150') || false;
    });
    expect(countElement).not.toBeInTheDocument();
  });

  it('shows count by default when count is provided', () => {
    render(<Rating rating={3.8} count={75} />);
    
    const ratingElements = screen.getAllByText((content, element) => {
      return element?.textContent?.includes('75') || false;
    });
    expect(ratingElements.length).toBeGreaterThan(0);
  });

  it('handles zero rating', () => {
    render(<Rating rating={0} />);
    
    const starsContainer = screen.getByText(/☆/);
    expect(starsContainer).toBeInTheDocument();
  });

  it('handles maximum rating', () => {
    render(<Rating rating={5} />);
    
    const starsContainer = screen.getByText(/★/);
    expect(starsContainer).toBeInTheDocument();
  });

  it('handles decimal ratings', () => {
    render(<Rating rating={3.7} count={42} />);
    
    expect(screen.getByText(/[★☆]/)).toBeInTheDocument();
    const ratingElements = screen.getAllByText((content, element) => {
      return element?.textContent?.includes('42') || false;
    });
    expect(ratingElements.length).toBeGreaterThan(0);
  });

  it('renders without count when not provided', () => {
    render(<Rating rating={4.1} />);
    
    expect(screen.getByText(/★/)).toBeInTheDocument();
    expect(screen.queryByText(/\(/)).not.toBeInTheDocument();
  });

  it('handles different sizes', () => {
    const { rerender } = render(<Rating rating={4} size="small" />);
    expect(screen.getByText(/★/)).toBeInTheDocument();

    rerender(<Rating rating={4} size="medium" />);
    expect(screen.getByText(/★/)).toBeInTheDocument();

    rerender(<Rating rating={4} size="large" />);
    expect(screen.getByText(/★/)).toBeInTheDocument();
  });

  it('handles edge case ratings', () => {
    const { rerender } = render(<Rating rating={-1} />);
    expect(screen.getByText(/[★☆]/)).toBeInTheDocument();

    rerender(<Rating rating={6} />);
    expect(screen.getByText(/[★☆]/)).toBeInTheDocument();
  });

  it('handles zero count', () => {
    render(<Rating rating={4.5} count={0} />);
    
    const ratingElements = screen.getAllByText((content, element) => {
      return element?.textContent?.includes('0') || false;
    });
    expect(ratingElements.length).toBeGreaterThan(0);
  });

  it('renders rating container with proper structure', () => {
    render(<Rating rating={3.5} count={25} />);
    
    expect(screen.getByText(/[★☆]/)).toBeInTheDocument();
    const ratingElements = screen.getAllByText((content, element) => {
      return element?.textContent?.includes('25') || false;
    });
    expect(ratingElements.length).toBeGreaterThan(0);
  });

  it('handles whole number ratings without half stars', () => {
    render(<Rating rating={3.0} count={30} />);
    
    const starsElement = screen.getByText(/★★★☆☆/);
    expect(starsElement).toBeInTheDocument();
  });
});
