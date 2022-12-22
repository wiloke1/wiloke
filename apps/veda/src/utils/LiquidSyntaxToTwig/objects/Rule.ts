import { DeepNullable } from './@utils';

/** @link https://shopify.dev/api/liquid/objects#rule */
interface _Rule {
  directive: any;
  value: string;
}

export type Rule = DeepNullable<_Rule> | null;
