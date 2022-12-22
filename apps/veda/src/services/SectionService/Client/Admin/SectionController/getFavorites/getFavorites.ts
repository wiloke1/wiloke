import { AxiosRequestConfig, AxiosResponse } from 'axios';
import { SectionFavoriteDataResponse } from 'services/SectionService/types';

import fetchAPI from 'utils/functions/fetchAPI';
import { baseUrl } from '../const';

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
      url: `${baseUrl}/favorites`,
      method: 'GET',
      params: {
        favoriteType: 'SECTION',
        categories: categories && categories.length > 0 ? categories.join(',') : undefined,
      },
    };
  } else {
    const { cursor } = params as LoadMoreParams;
    requestConfig = {
      url: `${baseUrl}/favorites`,
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
