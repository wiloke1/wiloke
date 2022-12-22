import { DeepNullable } from './@utils';
import { Variant } from './Variant';

/** @link https://shopify.dev/api/liquid/objects#image */
interface _Image {
  alt: string;
  aspect_ratio: number;
  attached_to_variant?: boolean;
  height: number;
  id: number;
  media_type: string;
  position: number;
  preview_image: Image;
  product_id: number;
  src: string;
  variants: Variant[];
  width: number;
}

export type Image = Partial<DeepNullable<_Image>> | null;
