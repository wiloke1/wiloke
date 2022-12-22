import { Image } from './Image';
import { Media } from './Media';
import { Metafield } from './Metafield';
import { ProductOption } from './ProductOption';
import { SellingPlan } from './SellingPlan';
import { SellingPlanAllocation } from './SellingPlanAllocation';
import { SellingPlanGroup } from './SellingPlanGroup';
import { DeepNullable } from './@utils';
import { Variant } from './Variant';

/** @link https://shopify.dev/api/liquid/objects#product */
interface _Product {
  available: boolean;
  collections: any; // Partial<Collection>[];
  compare_at_price: number;
  compare_at_price_max: number;
  compare_at_price_min: number;
  compare_at_price_varies: boolean;
  content: string;
  created_at: Date;
  description: string;
  featured_image: Image;
  featured_media: Media;
  first_available_variant: Partial<Variant>;
  gift_card?: boolean;
  handle: string;
  has_only_default_variant: boolean;
  id: number;
  images: Image[];
  media: Media[];
  metafields: Metafield;
  options:
    | string[]
    | Array<{
        id: number;
        product_id: number;
        name: string;
        position: number;
        values: string[];
      }>; // cần thêm;
  options_by_name: any;
  options_with_values?: ProductOption[];
  price: number;
  price_max: number;
  price_min: number;
  price_varies: boolean;
  published_at: string;
  requires_selling_plan: boolean;
  selected_or_first_available_selling_plan_allocation: SellingPlanAllocation;
  selected_or_first_available_variant: Variant;
  selected_selling_plan: SellingPlan;
  selected_selling_plan_allocation: SellingPlanAllocation;
  selected_variant: Variant;
  selling_plan_groups: SellingPlanGroup[];
  tags: '' | string[];
  template_suffix: string;
  title: string;
  type: string;
  url: string;
  variants: Variant[];
  vendor: string;
}

export type Product = Partial<DeepNullable<_Product>> | null;
