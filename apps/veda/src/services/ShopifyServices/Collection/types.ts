import { CollectionApiData } from 'types/Collections';

export interface CollectionShopifyResponse {
  info: CollectionApiData[];
  hasNextPage: boolean;
}
