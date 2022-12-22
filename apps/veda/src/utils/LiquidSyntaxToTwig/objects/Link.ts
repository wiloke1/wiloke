import { DeepNullable } from './@utils';

/** @link https://shopify.dev/api/liquid/objects#link */
interface _Link {
  active: boolean;
  child_active: boolean;
  child_current: boolean;
  current: boolean;
  handle: string;
  levels: number;
  links: _Link[];
  object: any;
  title: string;
  type:
    | 'blog_link'
    | 'catalog_link'
    | 'collection_link'
    | 'collections_link'
    | 'frontpage_link'
    | 'http_link'
    | 'page_link'
    | 'policy_link'
    | 'product_link'
    | 'search_link';
  url: string;
}

export type Link = DeepNullable<_Link> | null;
