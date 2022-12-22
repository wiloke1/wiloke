import { DeepNullable } from './@utils';
import { Image } from './Image';

/** @link https://shopify.dev/api/liquid/objects#media */
interface _Media {
  alt: string;
  id: number;
  media_type?: 'image' | 'model' | 'video' | 'external_video';
  position: any;
  preview_image: Image;
}

export type Media = DeepNullable<_Media> | null;
