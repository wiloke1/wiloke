import { ReactNode } from 'react';

export type ShopifyType = 'collections' | 'products' | 'pages' | 'blogs' | 'articles';

export type PickerType = 'shopify' | 'email' | 'phone' | 'custom';

export interface LinkPickerProps {
  label?: string;
  summary?: string;
  value: string;
  AfterLabel?: ReactNode;
  onChange?: (value: string) => void;
}
