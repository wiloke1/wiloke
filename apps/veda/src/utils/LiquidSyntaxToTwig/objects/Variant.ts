import { Image } from './Image';
import { Media } from './Media';
import { Product } from './Product';
import { SellingPlanAllocation } from './SellingPlanAllocation';
import { DeepNullable } from './@utils';
import { Metafield } from './Metafield';
import { StoreAvailability } from './StoreAvailability';
import { UnitPriceMeasurement } from './UnitPriceMeasurement';

/** @link https://shopify.dev/api/liquid/objects#variant */
interface _Variant {
  available: boolean;
  barcode: string;
  compare_at_price: number;
  featured_image: Image;
  featured_media: Media;
  id: number;
  image: Image;
  incoming: boolean;
  inventory_management: string;
  inventory_policy?: 'continue' | 'deny';
  inventory_quantity?: number;
  matched?: boolean;
  metafields: Metafield;
  next_incoming_date: string;
  option1: string;
  option2: string;
  option3: string;
  options: string[];
  price: number;
  product: Product;
  requires_selling_plan: boolean;
  requires_shipping: boolean;
  selected: boolean;
  selected_selling_plan_allocation: SellingPlanAllocation;
  selling_plan_allocations: SellingPlanAllocation[];
  sku: string;
  store_availabilities: StoreAvailability[];
  taxable: boolean;
  title: string;
  unit_price: string;
  unit_price_measurement: UnitPriceMeasurement;
  url: string;
  weight: number;
  weight_in_unit: string;
  weight_unit: string;
}

export type Variant = Partial<DeepNullable<_Variant>> | null;
