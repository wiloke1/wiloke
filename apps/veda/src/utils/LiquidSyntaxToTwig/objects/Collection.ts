import { Filter } from './Filter';
import { Image } from './Image';
import { Metafield } from './Metafield';
import { Product } from './Product';
import { SortOption } from './SortOption';
import { DeepNullable } from './@utils';

/**
 * @link https://shopify.dev/api/liquid/objects#collection
 */
interface _Collection {
  all_products_count: number;
  all_tags: string[];
  all_types: string[];
  all_vendors: string[];
  current_type: string;
  current_vendor: string;
  default_sort_by:
    | 'manual'
    | 'best-selling'
    | 'title-ascending'
    | 'title-descending'
    | 'price-ascending'
    | 'price-descending'
    | 'created-ascending'
    | 'created-descending';
  description: string;
  featured_image: Image;
  filters: Filter[];
  handle: string;
  id: number;
  image: Image;
  metafields: Metafield;
  next_product: Product | null;
  previous_product: Product | null;
  products: Product[];
  products_count: number;
  published_at: string;
  updated_at: string;
  sort_by: _Collection['default_sort_by'] | string;
  sort_options: SortOption[];
  tags: '' | string[];
  template_suffix: string;
  title: string;
  url: string;
}

export type Collection = Partial<DeepNullable<_Collection>> | null;
