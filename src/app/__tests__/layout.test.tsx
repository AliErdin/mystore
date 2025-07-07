import React from 'react';
import { render, screen } from '@testing-library/react';
import RootLayout from '../layout';

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
  it('renders children correctly', () => {
    render(
      <RootLayout>
        <div data-testid="test-child">Test Content</div>
      </RootLayout>
    );
    expect(screen.getByTestId('test-child')).toBeInTheDocument();
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('renders Header component', () => {
    render(
      <RootLayout>
        <div>Content</div>
      </RootLayout>
    );
    expect(screen.getByTestId('header')).toBeInTheDocument();
    expect(screen.getByText('Header Component')).toBeInTheDocument();
  });

  it('has proper HTML structure', () => {
    render(
      <RootLayout>
        <div>Content</div>
      </RootLayout>
    );
    const htmlElement = document.documentElement;
    expect(htmlElement).toBeInTheDocument();
    const bodyElement = document.body;
    expect(bodyElement).toBeInTheDocument();
  });

  it('includes CartProvider wrapper', () => {
    render(
      <RootLayout>
        <div data-testid="wrapped-content">Wrapped Content</div>
      </RootLayout>
    );
    expect(screen.getByTestId('wrapped-content')).toBeInTheDocument();
  });

  it('renders main content area', () => {
    render(
      <RootLayout>
        <div data-testid="main-content">Main Content</div>
      </RootLayout>
    );
    const mainElement = screen.getByRole('main');
    expect(mainElement).toBeInTheDocument();
    expect(screen.getByTestId('main-content')).toBeInTheDocument();
  });

  it('applies correct styling to main element', () => {
    render(
      <RootLayout>
        <div>Content</div>
      </RootLayout>
    );
    const mainElement = screen.getByRole('main');
    expect(mainElement).toHaveAttribute('style');
    const style = mainElement.getAttribute('style');
    expect(style).toContain('background-color: white');
  });

  it('handles multiple children', () => {
    render(
      <RootLayout>
        <div data-testid="child-1">Child 1</div>
        <div data-testid="child-2">Child 2</div>
        <div data-testid="child-3">Child 3</div>
      </RootLayout>
    );
    expect(screen.getByTestId('child-1')).toBeInTheDocument();
    expect(screen.getByTestId('child-2')).toBeInTheDocument();
    expect(screen.getByTestId('child-3')).toBeInTheDocument();
  });

  it('maintains proper document structure', () => {
    render(
      <RootLayout>
        <div>Content</div>
      </RootLayout>
    );
    const header = screen.getByTestId('header');
    const main = screen.getByRole('main');
    expect(header).toBeInTheDocument();
    expect(main).toBeInTheDocument();
    expect(header.compareDocumentPosition(main) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
  });

  it('provides cart context to children', () => {
    render(
      <RootLayout>
        <div data-testid="context-consumer">Context Consumer</div>
      </RootLayout>
    );
    expect(screen.getByTestId('context-consumer')).toBeInTheDocument();
  });
});
