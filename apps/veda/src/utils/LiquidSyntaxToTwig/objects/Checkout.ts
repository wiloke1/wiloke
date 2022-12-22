import { Address } from './Address';
import { Customer } from './Customer';
import { DiscountApplication } from './DiscountApplication';
import { GiftCard } from './GiftCard';
import { LineItem } from './LineItem';
import { Order } from './Order';
import { ShippingMethod } from './ShippingMethod';
import { TaxLine } from './TaxLine';
import { Transaction } from './Transaction';
import { DeepNullable } from './@utils';

/**
 * @link https://shopify.dev/api/liquid/objects#checkout
 */
interface _Checkout {
  applied_gift_cards: GiftCard[];
  attributes: Record<string, any>;
  billing_address: Address;
  buyer_accepts_marketing: boolean;
  cart_level_discount_applications: DiscountApplication[];
  currency: string;
  customer: Customer;
  discount_applications: DiscountApplication[];
  discounts_amount: DiscountApplication[];
  discounts_savings: DiscountApplication[];
  email: string;
  gift_cards_amount: string;
  id: number;
  line_items: LineItem[];
  line_items_subtotal_price: number;
  name: string;
  note: string;
  order: Order;
  order_id: string;
  order_name: string;
  order_number: string;
  requires_shipping: boolean;
  shipping_address: Address;
  shipping_method: ShippingMethod;
  shipping_methods: ShippingMethod[];
  shipping_price: number;
  tax_lines: TaxLine[];
  tax_price: number;
  total_price: number;
  transactions: Transaction[];
}

export type Checkout = DeepNullable<_Checkout> | null;
