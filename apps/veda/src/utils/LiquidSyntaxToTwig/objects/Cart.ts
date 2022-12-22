import { Currency } from './Currency';
import { DiscountApplication } from './DiscountApplication';
import { LineItem } from './LineItem';
import { DeepNullable } from './@utils';

/**
 * @link https://shopify.dev/api/liquid/objects#cart
 */
interface _Cart {
  attributes: Record<string, any>;
  cart_level_discount_applications: DiscountApplication[];
  checkout_charge_amount: number;
  currency: Currency;
  discount_applications: DiscountApplication[];
  empty?: boolean;
  item_count: number;
  items: LineItem[];
  items_subtotal_price: number;
  note: string;
  original_total_price: number;
  requires_shipping: boolean;
  taxes_included: boolean;
  total_discount: number;
  total_price: number;
  total_weight: number;
}

export type Cart = DeepNullable<_Cart> | null;
