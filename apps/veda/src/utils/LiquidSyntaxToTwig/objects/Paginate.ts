import { Part } from './Part';
import { DeepNullable } from './@utils';

/** @link https://shopify.dev/api/liquid/objects#paginate */
export interface _Paginate {
  current_offset: number;
  current_page: number;
  items: number;
  next: Part;
  page_param: string;
  page_size: number;
  pages: number;
  parts: Part[];
  previous: Part;
}

export type Paginate = DeepNullable<_Paginate> | null;
