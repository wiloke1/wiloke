import { DeepNullable } from './@utils';

/** @link https://shopify.dev/api/liquid/objects#filter_value */
interface _FilterValue {
  active: boolean;
  count: number;
  label: string;
  param_name: string;
  url_to_add: string;
  url_to_remove: string;
  value: string;
}

export type FilterValue = DeepNullable<_FilterValue>;
