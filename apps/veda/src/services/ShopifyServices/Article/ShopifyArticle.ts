import { AxiosResponse } from 'axios';
import fetchAPI from 'utils/functions/fetchAPI';
import { getShopName } from 'utils/functions/getUserInfo';
import { ArticleShopifyResponse } from './types';

export class ShopifyArticleService {
  async getArticles({ blogId, search }: { search?: string; blogId: number }) {
    const response: AxiosResponse<ArticleShopifyResponse> = await fetchAPI.request({
      url: `shopify-connections/admin-articles/${blogId}`,
      params: {
        search: search ? search : undefined,
        shopName: getShopName(),
        limit: 250,
      },
    });

    return response.data;
  }

  async loadMoreArticles({ blogId, search, lastCursor }: { search?: string; blogId: number; lastCursor: number }) {
    const response: AxiosResponse<ArticleShopifyResponse> = await fetchAPI.request({
      url: `shopify-connections/admin-articles/${blogId}`,
      params: {
        search: search ? search : undefined,
        shopName: getShopName(),
        limit: 20,
        cursor: lastCursor,
      },
    });

    return response.data;
  }
}
