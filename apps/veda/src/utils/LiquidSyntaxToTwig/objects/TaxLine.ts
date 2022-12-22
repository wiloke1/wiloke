import { DeepNullable } from './@utils';

/** @link https://shopify.dev/api/liquid/objects#tax_line */
interface _TaxLine {
  price: number;
  rate: number;
  rate_percentage: number;
  title: string;
}

export type TaxLine = DeepNullable<_TaxLine> | null;
