import { FilterValue } from './FilterValue';
import { DeepNullable } from './@utils';

/** @link https://shopify.dev/api/liquid/objects#filter */
interface _Filter {
  active_values: FilterValue[];
  false_value: FilterValue;
  inactive_values: FilterValue[];
  label: string;
  max_value: FilterValue;
  min_value: FilterValue;
  param_name: string;
  range_max: FilterValue;
  true_value: FilterValue;
  type: 'boolean' | 'list' | 'price_range';
  url_to_remove: string;
  values: FilterValue[];
}

export type Filter = DeepNullable<_Filter> | null;
