import { Currency } from './Currency';
import { DeepNullable } from './@utils';

/**
 * @link https://shopify.dev/api/liquid/objects#country
 */
interface _Country {
  currency: Currency;
  iso_code: string;
  name: string;
  unit_system: 'imperial' | 'metric';
}

export type Country = DeepNullable<_Country> | null;
