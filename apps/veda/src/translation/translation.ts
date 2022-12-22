import * as en from './en';
import * as vi from './vi';

export const translation = {
  en,
  vi,
} as const;

export const langOptions = [
  {
    label: 'Tiếng Việt',
    value: 'vi',
  },
  {
    label: 'English',
    value: 'en',
  },
  {
    label: 'French',
    value: 'fr',
  },
] as const;

export const DEFAULT_APP_LANGUAGE = 'en';
