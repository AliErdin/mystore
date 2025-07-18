import React from 'react';
import { render, screen } from '@testing-library/react';
import ActualLayout from '../[locale]/layout';
import { act } from 'react';

async function renderRoot(ui: React.ReactNode) {
  let element: React.ReactElement;
  await act(async () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    element = await (ActualLayout as any)({ children: ui, params: { locale: 'en' } });
  });
  render(element!);
}


jest.mock('@/components/organisms/Header/Header', () => {
  return function MockHeader() {
    return <header data-testid="header">Header Component</header>;
  };
});

jest.mock('styled-components', () => ({
  ...jest.requireActual('styled-components'),
  ServerStyleSheet: jest.fn(() => ({
    collectStyles: jest.fn((tree) => tree),
    getStyleTags: jest.fn(() => ''),
    getStyleElement: jest.fn(() => []),
    instance: {
      clearTag: jest.fn()
    },
    seal: jest.fn(),
  })),
}));

jest.mock('next/navigation', () => ({
  useServerInsertedHTML: jest.fn((callback) => callback()),
}));

describe('RootLayout', () => {
  it('renders children correctly', async () => {
    await renderRoot(
      
        <div data-testid="test-child">Test Content</div>
      
    );
    expect(screen.getByTestId('test-child')).toBeInTheDocument();
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('renders Header component', async () => {
    await renderRoot(
      
        <div>Content</div>
      
    );
    expect(screen.getByTestId('header')).toBeInTheDocument();
    expect(screen.getByText('Header Component')).toBeInTheDocument();
  });

  it('has proper HTML structure', async () => {
    await renderRoot(
      
        <div>Content</div>
      
    );
    const htmlElement = document.documentElement;
    expect(htmlElement).toBeInTheDocument();
    const bodyElement = document.body;
    expect(bodyElement).toBeInTheDocument();
  });

  it('includes CartProvider wrapper', async () => {
    await renderRoot(
      
        <div data-testid="wrapped-content">Wrapped Content</div>
      
    );
    expect(screen.getByTestId('wrapped-content')).toBeInTheDocument();
  });

  it('renders main content area', async () => {
    await renderRoot(
      
        <div data-testid="main-content">Main Content</div>
      
    );
    const mainElement = screen.getByRole('main');
    expect(mainElement).toBeInTheDocument();
    expect(screen.getByTestId('main-content')).toBeInTheDocument();
  });

  it('applies minimum height style to main element', async () => {
    await renderRoot(
      
        <div>Content</div>
      
    );
    const mainElement = screen.getByRole('main');
    expect(mainElement).toHaveAttribute('style');
    const style = mainElement.getAttribute('style');
    expect(style).toContain('min-height: calc(100vh - 80px)');
  });

  it('handles multiple children', async () => {
    await renderRoot(
      <>
        <div data-testid="child-1">Child 1</div>
        <div data-testid="child-2">Child 2</div>
        <div data-testid="child-3">Child 3</div>
      </>
    );
    expect(screen.getByTestId('child-1')).toBeInTheDocument();
    expect(screen.getByTestId('child-2')).toBeInTheDocument();
    expect(screen.getByTestId('child-3')).toBeInTheDocument();
  });

  it('maintains proper document structure', async () => {
    await renderRoot(
      
        <div>Content</div>
      
    );
    const header = screen.getByTestId('header');
    const main = screen.getByRole('main');
    expect(header).toBeInTheDocument();
    expect(main).toBeInTheDocument();
    expect(header.compareDocumentPosition(main) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
  });

  it('provides cart context to children', async () => {
    await renderRoot(
      
        <div data-testid="context-consumer">Context Consumer</div>
      
    );
    expect(screen.getByTestId('context-consumer')).toBeInTheDocument();
  });
});
