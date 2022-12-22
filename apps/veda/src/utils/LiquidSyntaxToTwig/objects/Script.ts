import { DeepNullable } from './@utils';

/** @link https://shopify.dev/api/liquid/objects#script */
interface _Script {
  id: number;
  value: string;
}

export type Script = DeepNullable<_Script> | null;
