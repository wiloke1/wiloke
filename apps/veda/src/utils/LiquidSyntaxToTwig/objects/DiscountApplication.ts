import { DeepNullable } from './@utils';

/** @link https://shopify.dev/api/liquid/objects#discount_application */
interface _DiscountAppilication {
  target_selection: 'all' | 'entitled' | 'explicit';
  target_type: 'line_item' | 'shipping_line';
  title: string;
  total_allocated_amount: number;
  type: 'automatic' | 'discount_code' | 'manual' | 'script';
  value: number;
  value_type: 'fixed_amount' | 'percentage';
}

export type DiscountApplication = DeepNullable<_DiscountAppilication> | null;
