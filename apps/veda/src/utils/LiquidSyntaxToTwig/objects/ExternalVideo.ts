import { Image } from './Image';
import { DeepNullable } from './@utils';

/** @link https://shopify.dev/api/liquid/objects#external_video */
interface _ExternalVideo {
  alt: string;
  aspect_ratio: any;
  external_id: string;
  host: 'youtube' | 'vimeo' | string;
  id: number;
  media_type: any;
  postion: number;
  preview_image: Image;
}

export type ExternalVideo = DeepNullable<_ExternalVideo> | null;
