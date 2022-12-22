import { CompanyLocation } from './CompanyLocation';

/**
 * @link https://shopify.dev/api/liquid/objects#company
 */
export interface Company {
  available_locations: CompanyLocation[];
  id: number;
  name: string;
}
