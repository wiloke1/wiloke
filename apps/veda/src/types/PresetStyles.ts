import { GoogleFonts } from 'components/FontField/FontField';

export interface PresetStyle {
  id: string;
  title: string;
  colors: CssColorVariable[];
  fonts: CssFontVariable[];
}

export interface CssColorVariable {
  id: string;
  name: string;
  light: string;
  dark: string;
}

export interface CssFontVariable {
  id: string;
  name: string;
  value: GoogleFonts;
}
