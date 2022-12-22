import { DeepNullable } from './@utils';

/**
 * @link https://shopify.dev/api/liquid/objects#address
 */
interface _Address {
  address1: string;
  address2: string;
  city: string;
  company: string;
  country: string;
  country_code: string;
  first_name: string;
  last_name: string;
  name: string;
  phone: string;
  province: string;
  province_code: string;
  street: string;
  summary: string;
  url: string;
  zip: string;

  // Cần thêm
  default: boolean;
  country_name: string;
}

export type Address = Partial<DeepNullable<_Address>> | null;
