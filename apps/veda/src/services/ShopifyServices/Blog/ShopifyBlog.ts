import { AxiosResponse } from 'axios';
import { getCurrentVersion } from 'utils/CacheControl/CacheControl';
import fetchAPI from 'utils/functions/fetchAPI';
import { getShopName } from 'utils/functions/getUserInfo';
import { BlogShopifyResponse } from './types';

interface IShopifyBlogService {
  getBlogs: (search: string, limit?: number) => Promise<BlogShopifyResponse>;
  loadMoreBlog: (search: string, cursor: number) => Promise<BlogShopifyResponse>;
  getBlogStatic: () => Promise<BlogShopifyResponse>;
}
export class ShopifyBlogService implements IShopifyBlogService {
  getBlogs: IShopifyBlogService['getBlogs'] = async (search, limit = 5) => {
    const response: AxiosResponse<BlogShopifyResponse> = await fetchAPI.request({
      url: `shopify-connections/admin-blogs?shopName=${getShopName()}`,
      params: {
        search: search ? search : undefined,
        limit,
      },
    });

    return response.data;
  };

  loadMoreBlog: IShopifyBlogService['loadMoreBlog'] = async (search: string, cursor: number) => {
    const response: AxiosResponse<BlogShopifyResponse> = await fetchAPI.request({
      url: `shopify-connections/admin-blogs?shopName=${getShopName()}`,
      params: {
        search: search ? search : undefined,
        cursor,
        limit: 3,
      },
    });

    return response.data;
  };

  getBlogStatic: IShopifyBlogService['getBlogStatic'] = async () => {
    const response: AxiosResponse<BlogShopifyResponse> = await fetchAPI.request({
      url: `shopify-connections/admin-blogs/static`,
      params: {
        shopName: getShopName(),
        version: getCurrentVersion(),
      },
    });
    return response.data;
  };
}
