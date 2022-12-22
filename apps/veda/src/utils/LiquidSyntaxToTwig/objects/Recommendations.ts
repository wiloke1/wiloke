import { Product } from './Product';
import { DeepNullable } from './@utils';

/** @link https://shopify.dev/api/liquid/objects#recommendations */
interface _Recommendations {
  intent: 'related' | 'complementary';
  performed: boolean;
  products_count: number;
  products: Product[];
}

export type Recommendations = DeepNullable<_Recommendations> | null;
