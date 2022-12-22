import { getLocale } from 'translation';
import { en as labelEn } from './label/en';
import { fr as labelFr } from './label/fr';
import { vi as labelVi } from './label/vi';
import { en as summaryEn } from './summary/en';
import { fr as summaryFr } from './summary/fr';
import { vi as summaryVi } from './summary/vi';

type _Locale = 'en' | 'vi' | 'fr';
export type Locale = _Locale | Omit<string, _Locale>;
type LabelValue = keyof typeof labelEn;
type SummaryValue = keyof typeof summaryEn;
export type GetValue<T extends string> = T | Omit<string, T>;

export const schemaTranslation = (value: GetValue<LabelValue>): string => {
  const locale = getLocale();
  switch (locale) {
    case 'vi':
      return labelVi[value as LabelValue] ?? value;
    case 'fr':
      return labelFr[value as LabelValue] ?? value;
    case 'en':
      return labelEn[value as LabelValue] ?? value;
    default:
      return value as string;
  }
};

export const schemaTranslationSummary = (value: GetValue<SummaryValue>): string => {
  const locale = getLocale();
  switch (locale) {
    case 'vi':
      return summaryVi[value as SummaryValue] ?? '';
    case 'fr':
      return summaryFr[value as SummaryValue] ?? '';
    case 'en':
      return summaryEn[value as SummaryValue] ?? '';
    default:
      return '';
  }
};
