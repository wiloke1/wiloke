import { SellingPlanCheckoutCharge } from './SellingPlanCheckoutCharge';
import { SellingPlanOption } from './SellingPlanOption';
import { DeepNullable } from './@utils';

type SellingPlanPriceAdjustment = any;

/** @link https://shopify.dev/api/liquid/objects#selling_plan */
interface _SellingPlan {
  checkout_charge: SellingPlanCheckoutCharge;
  description: string;
  group_id: string;
  id: number;
  name: string;
  options: SellingPlanOption[];
  price_adjustments: SellingPlanPriceAdjustment[];
  recurring_deliveries: boolean;
  selected: boolean;
}

export type SellingPlan = DeepNullable<_SellingPlan> | null;
