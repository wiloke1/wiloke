import { Image } from './Image';
import { DeepNullable } from './@utils';

/** @link https://shopify.dev/api/liquid/objects#generic_file */
interface _GenericFile {
  alt: string;
  id: number;
  media_type: string;
  position: number;
  preview_image: Image;
  url: string;
}

export type GenericFile = DeepNullable<_GenericFile> | null;
