import { Metafield } from './Metafield';
import { DeepNullable } from './@utils';

/** @link https://shopify.dev/api/liquid/objects#page */
interface _Page {
  author: string;
  content: string;
  handle: string;
  id: number;
  metafields: Metafield;
  pushlished_at: string;
  template_suffix: string;
  title: string;
  url: string;
}

export type Page = DeepNullable<_Page> | null;
