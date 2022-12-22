import { DeepNullable } from './@utils';

/** @link https://shopify.dev/api/liquid/objects#theme */
interface _Theme {
  id: number;
  name: string;
  role: 'main' | 'unpublished' | 'demo' | 'development';
}

export type Theme = DeepNullable<_Theme> | null;
