import { DeepNullable } from './@utils';

/** @link https://shopify.dev/api/liquid/objects#policy */
interface _Policy {
  body: string;
  id: string;
  title: string;
  url: string;
}

export type Policy = DeepNullable<_Policy> | null;
