import { DeepNullable } from './@utils';

/** @link https://shopify.dev/api/liquid/objects#part */
export interface _Part {
  is_link: boolean;
  title: string;
  url: string | undefined;
}

export type Part = DeepNullable<_Part> | null;
