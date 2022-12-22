import { DeepNullable } from './@utils';

/** @link https://shopify.dev/api/liquid/objects#metafield */
interface _Metafield extends Record<string, any> {
  list?: boolean;
  type: any;
  value: any;
}

export type Metafield = DeepNullable<_Metafield> | null;
