import { DeepNullable } from './@utils';

/** @link https://shopify.dev/api/liquid/objects#model_source */
interface _ModelSource {
  format: string;
  mime_type: string;
  url: string;
}

export type ModelSource = DeepNullable<_ModelSource> | null;
