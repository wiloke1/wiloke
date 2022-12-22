import { DeepNullable } from './@utils';

/** @link https://shopify.dev/api/liquid/objects#video_source */
interface _VideoSource {
  format: 'mov' | 'mp4' | 'm3u8';
  height: number;
  mime_type: number;
  url: string;
  width: number;
}

export type VideoSource = DeepNullable<_VideoSource> | null;
