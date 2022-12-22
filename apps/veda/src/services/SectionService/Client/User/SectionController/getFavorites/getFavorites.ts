import { AxiosRequestConfig, AxiosResponse } from 'axios';
import configureApp from 'configureApp';
import { SectionFavoriteDataResponse } from 'services/SectionService/types';
import fetchAPI from 'utils/functions/fetchAPI';

interface Params {
  type: 'Get first page';
  categories?: string[];
}

interface LoadMoreParams {
  type: 'Load more';
  categories?: string[];
  cursor: string;
}
interface ResponseSuccess {
  info?: SectionFavoriteDataResponse[];
  message: string;
}

export const getFavorites = async ({ type, categories, ...params }: Params | LoadMoreParams) => {
  let requestConfig: AxiosRequestConfig = {};
  if (type === 'Get first page') {
    requestConfig = {
      url: `${configureApp.endpoint.clients}/me/favorites`,
      method: 'GET',
      params: {
        favoriteType: 'SECTION',
        categories: categories && categories.length > 0 ? categories.join(',') : undefined,
      },
    };
  } else {
    const { cursor } = params as LoadMoreParams;
    requestConfig = {
      url: `${configureApp.endpoint.clients}/me/favorites`,
      method: 'GET',
      params: {
        favoriteType: 'SECTION',
        categories: categories && categories.length > 0 ? categories.join(',') : undefined,
        after: cursor,
      },
    };
  }
  const response: AxiosResponse<ResponseSuccess> = await fetchAPI.request(requestConfig);
  return response.data;
};
