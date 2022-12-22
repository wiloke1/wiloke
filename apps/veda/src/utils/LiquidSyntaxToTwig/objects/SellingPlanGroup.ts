import { SellingPlan } from './SellingPlan';
import { SellingPlanGroupOption } from './SellingPlanGroupOption';
import { DeepNullable } from './@utils';

/** @link https://shopify.dev/api/liquid/objects#selling_plan_group */
interface _SellingPlanGroup {
  app_id: string;
  id: number;
  name: number;
  options: SellingPlanGroupOption[];
  selling_plan_selected: boolean;
  selling_plans: SellingPlan;
}

export type SellingPlanGroup = DeepNullable<_SellingPlanGroup> | null;
