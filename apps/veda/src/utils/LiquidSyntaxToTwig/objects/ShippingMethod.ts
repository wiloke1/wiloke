import { DiscountAllocation } from './DiscountAllocation';
import { TaxLine } from './TaxLine';
import { DeepNullable } from './@utils';

/** @link https://shopify.dev/api/liquid/objects#shipping_method */
interface _ShippingMethod {
  discount_allocations: DiscountAllocation[];
  handle: string;
  od: string;
  original_price: number;
  price: number;
  tax_lines: TaxLine[];
  title: string;
}

export type ShippingMethod = DeepNullable<_ShippingMethod> | null;
