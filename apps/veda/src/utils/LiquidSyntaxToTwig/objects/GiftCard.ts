import { Customer } from './Customer';
import { Product } from './Product';
import { DeepNullable } from './@utils';

/** @link https://shopify.dev/api/liquid/objects#gift_card */
interface _GiftCard {
  balance: number;
  code: string;
  currency: string;
  customer: Customer;
  enabled: boolean;
  expired: boolean;
  expires_on: string;
  initial_value: number;
  last_four_characters: string;
  pass_url: string;
  product: Product;
  properties: any;
  qr_identifier: string;
  template_suffix: string;
  url: string;
}

export type GiftCard = DeepNullable<_GiftCard> | null;
