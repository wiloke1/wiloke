import { Group } from './Group';
import { DeepNullable } from './@utils';

/** @link https://shopify.dev/api/liquid/objects#robots */
interface _Robots {
  default_groups: Group[];
}

export type Robots = DeepNullable<_Robots> | null;
