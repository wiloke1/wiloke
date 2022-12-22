import { AxiosResponse } from 'axios';
import configureApp from 'configureApp';
import { ResponseShopifyPages } from 'types/Pages';
import fetchAPI from 'utils/functions/fetchAPI';
import { getShopName } from 'utils/functions/getUserInfo';
import { getPages } from './fakeData';

export class ShopifyPageService {
  async getPages(search: string): Promise<ResponseShopifyPages> {
    if (configureApp.apiFake) {
      const response = await getPages(search);
      return {
        info: response,
        message: 'success',
        hasNextPage: false,
      };
    }
    const response: AxiosResponse<ResponseShopifyPages> = await fetchAPI.request({
      url: `shopify-connections/admin-pages?shopName=${getShopName()}`,
      params: {
        search: search ? search : undefined,
      },
    });
    return response.data;
  }

  async loadMorePages(lastCursor: string, search?: string) {
    const response: AxiosResponse<ResponseShopifyPages> = await fetchAPI.request({
      url: `shopify-connections/admin-pages?shopName=${getShopName()}`,
      params: {
        search: search ? search : undefined,
        cursor: lastCursor,
      },
    });
    return response.data;
  }
}
