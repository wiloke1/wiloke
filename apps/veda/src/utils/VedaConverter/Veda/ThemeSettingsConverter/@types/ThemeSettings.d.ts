type GoogleFonts = any;

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

export interface CssVariables {
  /** Các màu cho theme */
  colors: CssColorVariable[];
  /** Toàn bộ fonts của theme */
  fonts: CssFontVariable[];
}

export interface LayoutSettings {
  containerWidth: number;
  containerGap: number;
  columnGapX: number;
  columnGapY: number;
}

export interface ThemeGeneralSettings {
  /** Bật preloader */
  preloaderEnable: boolean;
  /** Chọn kiểu cho preloader */
  preloaderVariant: number;
  /** Chọn background color cho preloader */
  preloaderBackgroundColor: string;
  /** Chọn color cho preloader */
  preloaderColor: string;
  /** Chọn logo cho preloader */
  preloaderLogo: string;

  /** Chọn favicon */
  favicon: string;
  /** Tên của theme */
  label: string;
  /** ảnh preview của theme */
  featuredImage?: string;
}

export interface ThemeSettings {
  /** Tất cả các biến colors và fonts */
  cssVariables: CssVariables;
  /** Settings layout như container, column */
  layoutSettings: LayoutSettings;
  /** Settings chung của theme */
  generalSettings: ThemeGeneralSettings;
  /** Translation của theme */
  globalTranslations: ThemeTranslations;
}

type Languages = 'vi' | 'en' | 'fr';
type FileContent = any;

export type ThemeTranslations = Record<Languages, FileContent>;
