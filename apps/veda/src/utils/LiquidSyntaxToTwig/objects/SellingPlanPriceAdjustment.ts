/** @link https://shopify.dev/api/liquid/objects#selling_plan_price_adjustment */
export interface SellingPlanPriceAdjustment {
  order_count: number;
  position: number;
  value: number;
  value_type: 'percentage' | 'fixed_amount' | 'price';
}
