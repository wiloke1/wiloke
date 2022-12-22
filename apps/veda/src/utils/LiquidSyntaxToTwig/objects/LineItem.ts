import { DiscountAllocation } from './DiscountAllocation';
import { Fulfillment } from './Fulfillment';
import { Image } from './Image';
import { Product } from './Product';
import { SellingPlanAllocation } from './SellingPlanAllocation';
import { TaxLine } from './TaxLine';
import { UnitPriceMeasurement } from './UnitPriceMeasurement';
import { DeepNullable, NonEmptyValue } from './@utils';
import { Variant } from './Variant';

/** @link https://shopify.dev/api/liquid/objects#line_item */
interface _LineItem {
  discount_allocations: DiscountAllocation[];
  final_line_price: number;
  final_price: number;
  fulfillment: Fulfillment;
  fulfillment_service: string;
  gift_card: boolean;
  grams: number;
  id: number;
  image: Image;
  key: string;
  line_level_discount_allocations: DiscountAllocation[];
  line_level_total_discount: number;
  message: string;
  options_with_values: any[];
  original_line_price: number;
  original_price: number;
  product: Product;
  product_id: NonEmptyValue<Product>['id'];
  properties: Record<string, any>;
  quantity: number;
  requires_shipping: boolean;
  selling_plan_allocation: SellingPlanAllocation;
  sku: string;
  successfully_fulfilled_quantity: number;
  tax_lines: TaxLine[];
  taxable: boolean;
  title: string;
  unit_price: number;
  unit_price_measurement: UnitPriceMeasurement;
  url: string;
  url_to_remove: string;
  variant: Variant;
  variant_id: number;
  vendor: string;
}

export type LineItem = Partial<DeepNullable<_LineItem>> | null;
