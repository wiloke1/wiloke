import { DeepNullable } from './@utils';

/**
 * @link https://shopify.dev/api/liquid/objects#currency
 */
interface _Currency {
  iso_code: string;
  name: string;
  symbol: string;
}

export type Currency = DeepNullable<_Currency> | null;
