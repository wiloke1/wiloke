import { DeepNullable } from './@utils';
import { Image } from './Image';
import { ModelSource } from './ModelSource';

/** @link https://shopify.dev/api/liquid/objects#model */
interface _Model {
  alt: string;
  id: number;
  media_type: string;
  position: number;
  preview_image: Image;
  sources: ModelSource[];
}

export type Model = DeepNullable<_Model> | null;
