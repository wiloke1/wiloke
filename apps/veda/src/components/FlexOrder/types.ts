import { langOptions } from 'translation/translation';

export interface FlexOrderDataItem {
  id: string;
  label: Record<typeof langOptions[number]['value'], string> | string;
  name: string;
}

export type FlexOrderValue = Record<string, number>;
