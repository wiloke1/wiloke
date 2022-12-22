import { AxiosResponse } from 'axios';
import { getCurrentVersion } from 'utils/CacheControl/CacheControl';
import fetchAPI from 'utils/functions/fetchAPI';
import { getShopName } from 'utils/functions/getUserInfo';
import { CollectionShopifyResponse } from './types';

type SortKey = 'TITLE' | 'UPDATED_AT' | 'ID' | 'RELEVANCE';
type Reverse = boolean;

interface ICollectionService {
  getCollections: (search: string, limit?: number, sortKey?: SortKey, reverse?: Reverse) => Promise<CollectionShopifyResponse>;
  loadMoreCollections: (search: string, cursor: string, limit?: number, sortKey?: SortKey, reverse?: Reverse) => Promise<CollectionShopifyResponse>;
}

class CollectionService implements ICollectionService {
  getCollections: ICollectionService['getCollections'] = async (search, limit = 10, sortKey = 'UPDATED_AT', reverse = true) => {
    const response: AxiosResponse<CollectionShopifyResponse> = await fetchAPI.request({
      url: `shopify-connections/admin-collections/static`,
      params: {
        search: search ? search : undefined,
        limit,
        sortKey,
        reverse,
        shopName: getShopName(),
        version: getCurrentVersion(),
      },
    });

    return response.data;
  };

  loadMoreCollections: ICollectionService['loadMoreCollections'] = async (search, cursor, limit = 10, sortKey = 'UPDATED_AT', reverse = true) => {
    const response: AxiosResponse<CollectionShopifyResponse> = await fetchAPI.request({
      url: `shopify-connections/admin-collections/static`,
      params: {
        search: search ? search : undefined,
        cursor,
        sortKey,
        reverse,
        limit,
        shopName: getShopName(),
        version: getCurrentVersion(),
      },
    });

    return response.data;
  };
}

export { CollectionService };
