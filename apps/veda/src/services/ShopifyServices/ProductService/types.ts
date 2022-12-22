import { ProductApiData } from 'types/Products';

export interface ShopifyProductResponse {
  info: ProductApiData[];
  hasNextPage: boolean;
  message: string;
}
