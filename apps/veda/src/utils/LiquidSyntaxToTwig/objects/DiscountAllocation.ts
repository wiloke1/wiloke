import { DeepNullable } from './@utils';
import { DiscountApplication } from './DiscountApplication';

/** @link https://shopify.dev/api/liquid/objects#discount_allocation */
interface _DiscountAllocation {
  amount: number;
  discount_application: DiscountApplication;
}

export type DiscountAllocation = DeepNullable<_DiscountAllocation> | null;
