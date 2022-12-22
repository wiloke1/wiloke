import { Country } from './Country';

/**
 * @link https://shopify.dev/api/liquid/objects#company_address
 */
export interface CompanyAddress {
  address1: string;
  address2: string;
  city: string;
  country: Country;
  country_code: string;
  id: number;
  province: string;
  province_code: string;
  street: string;
  zip: string;
}
