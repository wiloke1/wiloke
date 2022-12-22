import { Company } from './Company';
import { CompanyAddress } from './CompanyAddress';

/**
 * @link https://shopify.dev/api/liquid/objects#company_location
 */
export interface CompanyLocation {
  company: Company;
  current?: boolean;
  id: number;
  name: string;
  shipping_address: CompanyAddress;
  url_to_set_as_current: string;
}
