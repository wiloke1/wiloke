import { DeepNullable } from './@utils';

/**
 * @link https://shopify.dev/api/liquid/objects#color
 */
interface _Color {
  alpha: number;
  blue: number;
  green: number;
  hue: number;
  lightness: number;
  red: number;
  saturation: number;
}

export type Color = DeepNullable<_Color> | null;
