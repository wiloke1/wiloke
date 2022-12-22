import { CssVariables } from 'types/Result';
import { v4 } from 'uuid';

const initialState: CssVariables = {
  colors: [
    { id: v4(), name: '--color-primary', light: '#F57070', dark: '#F57070' },
    { id: v4(), name: '--color-secondary', light: '#3540df', dark: '#3540df' },
    { id: v4(), name: '--color-tertiary', light: '#2AB885', dark: '#2AB885' },
    { id: v4(), name: '--color-quaternary', light: '#FBC473', dark: '#FBC473' },
    { id: v4(), name: '--color-dark', light: '#0f0f36', dark: '#ffffff' },
    { id: v4(), name: '--color-gray9', light: '#17174F', dark: '#F8F8FC' },
    { id: v4(), name: '--color-gray8', light: '#26256C', dark: '#f2f2f7' },
    { id: v4(), name: '--color-gray7', light: '#494880', dark: '#DEDEE9' },
    { id: v4(), name: '--color-gray6', light: '#6D6D9C', dark: '#D2D2E2' },
    { id: v4(), name: '--color-gray5', light: '#9E9ECC', dark: '#9E9ECC' },
    { id: v4(), name: '--color-gray4', light: '#D2D2E2', dark: '#6D6D9C' },
    { id: v4(), name: '--color-gray3', light: '#DEDEE9', dark: '#494880' },
    { id: v4(), name: '--color-gray2', light: '#f2f2f7', dark: '#26256C' },
    { id: v4(), name: '--color-gray1', light: '#F8F8FC', dark: '#17174F' },
    { id: v4(), name: '--color-light', light: '#ffffff', dark: '#17174F' },
  ],
  fonts: [
    { id: v4(), name: '--font-primary', value: 'Roboto' },
    { id: v4(), name: '--font-secondary', value: 'Poppins' },
    { id: v4(), name: '--font-tertiary', value: 'Playfair Display' },
    { id: v4(), name: '--font-quaternary', value: 'Roboto Mono' },
  ],
};

export const defaultColorNames = [
  '--color-primary',
  '--color-secondary',
  '--color-tertiary',
  '--color-quaternary',
  '--color-dark',
  '--color-gray9',
  '--color-gray8',
  '--color-gray7',
  '--color-gray6',
  '--color-gray5',
  '--color-gray4',
  '--color-gray3',
  '--color-gray2',
  '--color-gray1',
  '--color-light',
];
export const defaultFontNames = ['--font-primary', '--font-secondary', '--font-tertiary', '--font-quaternary'];

export default initialState;
