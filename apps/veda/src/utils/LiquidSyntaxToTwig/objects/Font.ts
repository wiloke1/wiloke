import { DeepNullable } from './@utils';

/** @link https://shopify.dev/api/liquid/objects#font */
interface _Font {
  baseline_ratio: number;
  fallback_families: string;
  family: string;
  style: string;
  system?: boolean;
  variants: _Font[];
  weight: number;
}

export type Font = DeepNullable<_Font> | null;
