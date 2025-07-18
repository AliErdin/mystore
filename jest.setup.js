import '@testing-library/jest-dom'
import { render } from '@testing-library/react'
import { ThemeProvider } from 'styled-components'
import { lightTheme } from './src/themes'

// override render to wrap with ThemeProvider
const customRender = (ui, options = {}) =>
  render(ui, {
    wrapper: ({ children }) => (
      <ThemeProvider theme={lightTheme}>{children}</ThemeProvider>
    ),
    ...options,
  });

// override render using jest.mock
jest.mock('@testing-library/react', () => {
  const actual = jest.requireActual('@testing-library/react');
  return {
    ...actual,
    render: (ui, options = {}) =>
      actual.render(ui, {
        wrapper: ({ children }) => (
          <ThemeProvider theme={lightTheme}>{children}</ThemeProvider>
        ),
        ...options,
      }),
  };
});

const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
}
global.localStorage = localStorageMock

jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      push: jest.fn(),
      replace: jest.fn(),
      prefetch: jest.fn(),
    }
  },
  useSearchParams() {
    return new URLSearchParams()
  },
  usePathname() {
    return '/'
  },
}))

jest.mock('next/image', () => ({
  __esModule: true,
  default: (props) => {
    return <img {...props} />
  },
}))

jest.mock('next/link', () => ({
  __esModule: true,
  default: ({ children, href, ...props }) => {
    return <a href={href} {...props}>{children}</a>
  },
}))
