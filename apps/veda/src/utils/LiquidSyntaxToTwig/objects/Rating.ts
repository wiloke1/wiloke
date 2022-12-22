import { DeepNullable } from './@utils';

/** @link https://shopify.dev/api/liquid/objects#rating */
interface _Rating {
  rating: number;
  scale_max: number;
  scale_min: number;
}

export type Rating = DeepNullable<_Rating> | null;
