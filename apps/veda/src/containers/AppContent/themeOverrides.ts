import { ThemeOverrides } from 'wiloke-react-core';

export const themeOverrides: ThemeOverrides = {
  fonts: {
    primary: 'Roboto, sans-serif',
    secondary: 'Lexend Deca, sans-serif',
    tertiary: 'Helvetica Neue, sans-serif',
    quaternary: 'Poppins, sans-serif',
  },
  colors: {
    primary: '#2C36DC',
    secondary: '#2AB885',
    tertiary: '#9540f7',
    quaternary: '#ff6565',
    light: '#ffffff',
    gray1: '#F8F8FC',
    gray2: '#f2f2f7',
    gray3: '#DEDEE9',
    gray4: '#D2D2E2',
    gray5: '#9E9ECC',
    gray6: '#6D6D9C',
    gray7: '#494880',
    gray8: '#26256C',
    gray9: '#17174F',
    dark: '#0f0f36',
  },
  nightModeColors: {
    dark: '#ffffff',
    gray9: '#F8F8FC',
    gray8: '#f2f2f7',
    gray7: '#DEDEE9',
    gray6: '#D2D2E2',
    gray5: '#9E9ECC',
    gray4: '#6D6D9C',
    gray3: '#494880',
    gray2: '#26256C',
    gray1: '#17174F',
    light: '#17174F',
  },
  cssInJs: {
    pixelToRem: false,
    devMode: process.env.NODE_ENV === 'development',
  },
  grid: {
    container: {
      width: 1200,
      gap: 15,
    },
    columns: {
      max: 12,
      gap: 20,
    },
    breakpoints: {
      xs: 'default',
      sm: 768,
      md: 992,
      lg: 1200,
    },
  },
};
