import { Locales } from '../../../../@types/ShopifyLocales';
import { breakpoints } from './breakpoints';

export const translationsOfBreakpoints: Locales<Record<typeof breakpoints[number], string>> = {
  en: {
    lg: 'Large',
    md: 'Medium',
    sm: 'Small',
    xs: 'Extra small',
  },
  vi: {
    lg: 'Lớn',
    md: 'Trung bình',
    sm: 'Nhỏ',
    xs: 'Siêu nhỏ',
  },
  fr: {
    lg: 'Lớn',
    md: 'Trung bình',
    sm: 'Nhỏ',
    xs: 'Siêu nhỏ',
  },
};
