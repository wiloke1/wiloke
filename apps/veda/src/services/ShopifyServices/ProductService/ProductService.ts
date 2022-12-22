import { AxiosResponse } from 'axios';
import { getCurrentVersion } from 'utils/CacheControl/CacheControl';
import fetchAPI from 'utils/functions/fetchAPI';
import { getShopName } from 'utils/functions/getUserInfo';
import { ShopifyProductResponse } from './types';

type SortKey = 'TITLE' | 'PRODUCT_TYPE' | 'VENDOR' | 'INVENTORY_TOTAL' | 'UPDATED_AT' | 'CREATED_AT' | 'PUBLISHED_AT' | 'ID' | 'RELEVANCE';
type Reverse = boolean;

interface IProductService {
  getProducts: (search: string, limit?: number, sortKey?: SortKey, reverse?: Reverse) => Promise<ShopifyProductResponse>;
  loadMoreProduct: (search: string, lastCursor: string, limit?: number, sortKey?: SortKey, reverse?: Reverse) => Promise<ShopifyProductResponse>;
  getProductWithIds: (ids: string) => Promise<ShopifyProductResponse>;
}

export class ProductService implements IProductService {
  getProducts: IProductService['getProducts'] = async (search, limit = 10, sortKey = 'UPDATED_AT', reverse = true) => {
    const response: AxiosResponse<ShopifyProductResponse> = await fetchAPI.request({
      url: `shopify-connections/admin-products/static`,
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

  loadMoreProduct: IProductService['loadMoreProduct'] = async (search, lastCursor, limit = 10, sortKey = 'UPDATED_AT', reverse = true) => {
    const response: AxiosResponse<ShopifyProductResponse> = await fetchAPI.request({
      url: `shopify-connections/admin-products/static`,
      params: {
        search: search ? search : undefined,
        cursor: lastCursor,
        sortKey,
        reverse,
        limit,
        shopName: getShopName(),
        version: getCurrentVersion(),
      },
    });

    return response.data;
  };

  getProductWithIds: IProductService['getProductWithIds'] = async ids => {
    const response: AxiosResponse<ShopifyProductResponse> = await fetchAPI.request({
      url: `shopify-connections/admin-products/static`,
      params: {
        ids,
        shopName: getShopName(),
        version: getCurrentVersion(),
      },
    });
    return response.data;
  };
}
