import { DeepNullable } from './@utils';
import { Image } from './Image';
import { VideoSource } from './VideoSource';

/** @link https://shopify.dev/api/liquid/objects#video */
interface _Video {
  alt: string;
  aspect_ratio: number;
  duration: number;
  id: number;
  media_type: string;
  position: number;
  preview_image: Image;
  sources: VideoSource[];
}

export type Video = DeepNullable<_Video> | null;
