import { DefaultTheme } from 'styled-components';

export const lightTheme: DefaultTheme = {
  mode: 'light',
  colors: {
    background: '#ffffff',
    text: '#111111',
    primary: '#007bff',
    primaryHover: '#0056b3',
    danger: '#dc3545',
    headerBg: '#ffffff',
    headerText: '#333333',
    shadow: '#00000026',
    border: '#e9ecef',
  },
};

export const darkTheme: DefaultTheme = {
  mode: 'dark',
  colors: {
    background: '#0d1117',
    text: '#e6edf3',
    primary: '#0d6efd',
    primaryHover: '#0b5ed7',
    danger: '#f25f5c',
    headerBg: '#161b22',
    headerText: '#e6edf3',
    shadow: '#7d7d7d',
    border: '#444444',
  },
};

export type ThemeName = 'light' | 'dark';
