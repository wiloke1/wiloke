import { DeepNullable } from './@utils';

/** @link https://shopify.dev/api/liquid/objects#measurement */
interface _Measurement {
  type: 'dimension' | 'volume' | 'weight';
  unit: string;
  value: number;
}

export type Measurement = DeepNullable<_Measurement> | null;
