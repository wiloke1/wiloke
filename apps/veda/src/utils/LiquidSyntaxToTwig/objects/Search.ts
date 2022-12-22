import { Filter } from './Filter';
import { SortOption } from './SortOption';
import { DeepNullable } from './@utils';

/** @link https://shopify.dev/api/liquid/objects#search */
interface _Search {
  default_sort_by: string;
  filters: Filter[];
  performed: boolean;
  results: any[];
  results_count: number;
  sort_by: string;
  sort_options: SortOption[];
  terms: string;
  types: string[];
}

export type Search = DeepNullable<_Search> | null;
