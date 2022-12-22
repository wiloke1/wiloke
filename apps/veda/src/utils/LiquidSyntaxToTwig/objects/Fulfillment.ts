import { LineItem } from './LineItem';
import { DeepNullable } from './@utils';

/** @link https://shopify.dev/api/liquid/objects#fulfillment */
interface _Fulfillment {
  created_at: string;
  fulfillment_line_items: LineItem[];
  item_count: number;
  tracking_company: string;
  tracking_number: number;
  tracking_url: string;
}

export type Fulfillment = DeepNullable<_Fulfillment> | null;
