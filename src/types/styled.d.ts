import 'styled-components';
import { lightTheme } from '@/themes';

declare module 'styled-components' {
  export interface DefaultTheme {
    mode: 'light' | 'dark';
    colors: typeof lightTheme.colors;
  }
}
