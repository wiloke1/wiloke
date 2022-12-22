import { Address } from './Address';
import { CompanyLocation } from './CompanyLocation';
import { Order } from './Order';
import { DeepNullable } from './@utils';

/** @link https://shopify.dev/api/liquid/objects#customer */
interface _Customer {
  accepts_marketing: boolean;
  addresses: Address[];
  addresses_count: number;
  b2b?: boolean;
  company_available_locations: CompanyLocation[];
  current_company: CompanyLocation;
  current_location: CompanyLocation;
  default_address: Address;
  email: string;
  first_name: string;
  has_account: boolean;
  id: number;
  last_name: string;
  last_order: Order;
  name: string;
  orders: Order[];
  orders_count: number;
  phone: string;
  tags: '' | string[];
  tax_exempt: boolean;
  total_spent: number;
}

export type Customer = Partial<DeepNullable<_Customer>> | null;
