import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Pagination from '../Pagination';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string, options?: Record<string, unknown>) => {
      if (key === 'pagination_info') {
        const start = options && options.startItem !== undefined ? options.startItem : '';
        const end = options && options.endItem !== undefined ? options.endItem : '';
        const total = options && options.totalItems !== undefined ? options.totalItems : '';
        return `${start}-${end} of ${total}`;
      }
      return key;
    }
  })
}));

const mockPush = jest.fn();
const mockSearchParams = new URLSearchParams();

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
  useSearchParams: () => mockSearchParams,
  usePathname: () => '/',
}));

describe('Pagination', () => {
  beforeEach(() => {
    mockPush.mockClear();
    mockSearchParams.delete('page');
  });

  it('renders pagination with correct page numbers', () => {
    render(
      <Pagination 
        currentPage={1} 
        totalPages={5} 
        totalItems={50} 
        itemsPerPage={10} 
      />
    );
    
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();
  });

  it('shows correct pagination info', () => {
    render(
      <Pagination 
        currentPage={2} 
        totalPages={5} 
        totalItems={50} 
        itemsPerPage={10} 
      />
    );
    
    expect(document.body.textContent).toContain('11-20 of 50');
  });

  it('disables previous button on first page', () => {
    render(
      <Pagination 
        currentPage={1} 
        totalPages={5} 
        totalItems={50} 
        itemsPerPage={10} 
      />
    );
    
    const prevButton = screen.getByRole('button', { name: '←' });
    expect(prevButton).toBeDisabled();
  });

  it('disables next button on last page', () => {
    render(
      <Pagination 
        currentPage={5} 
        totalPages={5} 
        totalItems={50} 
        itemsPerPage={10} 
      />
    );
    
    const nextButton = screen.getByRole('button', { name: '→' });
    expect(nextButton).toBeDisabled();
  });

  it('enables navigation buttons on middle pages', () => {
    render(
      <Pagination 
        currentPage={3} 
        totalPages={5} 
        totalItems={50} 
        itemsPerPage={10} 
      />
    );
    
    const prevButton = screen.getByRole('button', { name: '←' });
    const nextButton = screen.getByRole('button', { name: '→' });
    
    expect(prevButton).not.toBeDisabled();
    expect(nextButton).not.toBeDisabled();
  });

  it('handles page number clicks', () => {
    render(
      <Pagination 
        currentPage={1} 
        totalPages={5} 
        totalItems={50} 
        itemsPerPage={10} 
      />
    );
    
    const pageButton = screen.getByRole('button', { name: '3' });
    fireEvent.click(pageButton);
    
    expect(mockPush).toHaveBeenCalledWith(expect.stringMatching(/^\/?\?page=3$/));
  });

  it('handles previous button click', () => {
    render(
      <Pagination 
        currentPage={3} 
        totalPages={5} 
        totalItems={50} 
        itemsPerPage={10} 
      />
    );
    
    const prevButton = screen.getByRole('button', { name: '←' });
    fireEvent.click(prevButton);
    
    expect(mockPush).toHaveBeenCalledWith(expect.stringMatching(/^\/?\?page=2$/));
  });

  it('handles next button click', () => {
    render(
      <Pagination 
        currentPage={2} 
        totalPages={5} 
        totalItems={50} 
        itemsPerPage={10} 
      />
    );
    
    const nextButton = screen.getByRole('button', { name: '→' });
    fireEvent.click(nextButton);
    
    expect(mockPush).toHaveBeenCalledWith(expect.stringMatching(/^\/?\?page=3$/));
  });

  it('highlights current page with active styling', () => {
    render(
      <Pagination 
        currentPage={3} 
        totalPages={5} 
        totalItems={50} 
        itemsPerPage={10} 
      />
    );
    
    const currentPageButton = screen.getByRole('button', { name: '3' });
    expect(currentPageButton).toBeInTheDocument();
    expect(currentPageButton).toHaveAttribute('data-variant', 'primary');
    expect(currentPageButton).toHaveClass(/sc-\w+/);
  });

  it('handles single page scenario', () => {
    render(
      <Pagination 
        currentPage={1} 
        totalPages={1} 
        totalItems={5} 
        itemsPerPage={10} 
      />
    );
    
    expect(document.body).toBeInTheDocument();
  });

  it('shows ellipsis for large page counts', () => {
    render(
      <Pagination 
        currentPage={5} 
        totalPages={20} 
        totalItems={200} 
        itemsPerPage={10} 
      />
    );
    
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getAllByText('...').length).toBeGreaterThan(0);
    expect(screen.getByText('20')).toBeInTheDocument();
  });
  
  it('shows correct ellipsis when on first page of many', () => {
    render(
      <Pagination 
        currentPage={1} 
        totalPages={20} 
        totalItems={200} 
        itemsPerPage={10} 
      />
    );
    
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getAllByText('...').length).toBeGreaterThan(0);
    expect(screen.getByText('20')).toBeInTheDocument();
  });
  
  it('shows correct ellipsis when on last page of many', () => {
    render(
      <Pagination 
        currentPage={20} 
        totalPages={20} 
        totalItems={200} 
        itemsPerPage={10} 
      />
    );
    
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getAllByText('...').length).toBeGreaterThan(0);
    expect(screen.getByText('20')).toBeInTheDocument();
  });
  
  it('shows correct page range for middle pages', () => {
    render(
      <Pagination 
        currentPage={10} 
        totalPages={20} 
        totalItems={200} 
        itemsPerPage={10} 
      />
    );
    
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getAllByText('...').length).toBeGreaterThan(0);
    expect(screen.getByText('20')).toBeInTheDocument();
  });

  it('preserves existing search parameters', () => {
    mockSearchParams.set('category', 'electronics');
    mockSearchParams.set('search', 'phone');
    
    render(
      <Pagination 
        currentPage={1} 
        totalPages={5} 
        totalItems={50} 
        itemsPerPage={10} 
      />
    );
    
    const pageButton = screen.getByRole('button', { name: '2' });
    fireEvent.click(pageButton);
    
    expect(mockPush).toHaveBeenCalledWith('/?category=electronics&search=phone&page=2');
  });

  it('calculates item range correctly', () => {
    render(
      <Pagination 
        currentPage={3} 
        totalPages={5} 
        totalItems={47} 
        itemsPerPage={10} 
      />
    );
    
    expect(document.body.textContent).toContain('21-30 of 47');
  });
});
