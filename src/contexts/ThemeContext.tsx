'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { ThemeProvider as StyledProvider, createGlobalStyle } from 'styled-components';
import { darkTheme, lightTheme, ThemeName } from '@/themes';

interface ThemeContextValue {
  theme: ThemeName;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextValue>({
  theme: 'light',
  toggleTheme: () => {},
});

export const useTheme = () => useContext(ThemeContext);

const GlobalStyle = createGlobalStyle`
  body {
    background: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text};
    transition: background 0.2s ease, color 0.2s ease;
  }
`;

export default function ThemeProvider({ children, initialTheme = 'light' }: { children: React.ReactNode; initialTheme?: ThemeName }) {
  const [theme, setTheme] = useState<ThemeName>(() => {
    if (typeof window === 'undefined') {
      return initialTheme;
    }
    return (localStorage.getItem('theme') as ThemeName) || initialTheme;
  });


  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('theme', theme);
      document.cookie = `theme=${theme}; Path=/; SameSite=Lax;`;
    }
  }, [theme]);

  const toggleTheme = () => setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));

  const themeObject = theme === 'light' ? lightTheme : darkTheme;

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <StyledProvider theme={themeObject}>
        <GlobalStyle />
        {children}
      </StyledProvider>
    </ThemeContext.Provider>
  );
}
