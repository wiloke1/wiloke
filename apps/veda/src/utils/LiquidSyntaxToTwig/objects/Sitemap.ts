import { DeepNullable } from './@utils';

/** @link https://shopify.dev/api/liquid/objects#sitemap */
interface _Sitemap {
  directive: string;
  value: string;
}

export type Sitemap = DeepNullable<_Sitemap> | null;
