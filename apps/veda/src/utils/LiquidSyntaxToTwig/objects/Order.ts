import { Address } from './Address';
import { Customer } from './Customer';
import { DiscountApplication } from './DiscountApplication';
import { LineItem } from './LineItem';
import { Metafield } from './Metafield';
import { ShippingMethod } from './ShippingMethod';
import { TaxLine } from './TaxLine';
import { Transaction } from './Transaction';
import { DeepNullable } from './@utils';

/** @link https://shopify.dev/api/liquid/objects#order */
interface _Order {
  attributes: Record<string, any>;
  billing_address: Address;
  cancel_reason: 'items unavailable' | 'fraudulent order' | 'customer changed/cancelled order' | 'other';
  cancel_reason_label: string;
  cancelled: boolean;
  cancelled_at: string;
  cart_level_discount_applications: DiscountApplication[];
  created_at: string;
  customer: Customer;
  customer_url: string;
  discount_applications: DiscountApplication[];
  email: string;
  financial_status: 'authorized' | 'expired' | 'paid' | 'partially_paid' | 'partially_refunded' | 'pending' | 'refunded' | 'unpaid' | 'voided';
  financial_status_label: any;
  fulfillment_status: string;
  fulfillment_status_label: 'complete' | 'fulfilled' | 'partial' | 'restocked' | 'unfulfilled';
  id: string;
  item_count: number;
  line_items: LineItem[];
  line_items_subtotal_price: number;
  metafields: Metafield;
  name: string;
  note: string;
  order_number: number;
  order_status_url: string;
  phone: string;
  shipping_address: Address;
  shipping_methods: ShippingMethod[];
  shipping_price: number;
  subtotal_line_items: LineItem[];
  subtotal_price: number;
  tags: string[];
  tax_lines: TaxLine[];
  tax_price: number;
  total_discounts: number;
  total_duties: number;
  total_net_amount: number;
  total_price: number;
  total_refunded_amount: number;
  transactions: Transaction[];
}

export type Order = Partial<DeepNullable<_Order>> | null;
