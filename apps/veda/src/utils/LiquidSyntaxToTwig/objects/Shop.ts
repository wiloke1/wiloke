import { Currency } from './Currency';
import { Address } from './Address';
import { Policy } from './Policy';
import { ShopLocale } from './ShopLocale';
import { DeepNullable } from './@utils';
import { Metafield } from './Metafield';

/** @link https://shopify.dev/api/liquid/objects#shop */
interface _Shop {
  aceepts_gift_cards: boolean;
  address: Address;
  collections_count: number;
  currency: Currency;
  customer_accounts_enabled: boolean;
  customer_accounts_optional: boolean;
  description: string;
  domain: string;
  email: string;
  enabled_currencies: boolean;
  enabled_payment_types: any;
  id: number;
  metafields: Metafield;
  money_format: Extract<Currency, string>; // Chỉ lấy string
  money_with_currency_format: Extract<Currency, string>; // Chỉ lấy string
  name: string;
  password_message: string;
  permanent_domain: string;
  phone: string;
  policies: Policy[];
  privacy_policy: Policy;
  products_count: number;
  published_locales: ShopLocale[];
  refund_policy: Policy;
  secure_url: string;
  shipping_policy: Policy;
  subscription_policy: Policy;
  terms_of_service: Policy;
  types: string[];
  url: string;
  vendors: string[];
}

export type Shop = DeepNullable<_Shop> | null;
