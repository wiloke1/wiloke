import { AxiosRequestConfig, AxiosResponse } from 'axios';
import configureApp from 'configureApp';
import { PageFavoriteDataResponse } from 'services/PageService/VedaApplication/types';
import fetchAPI from 'utils/functions/fetchAPI';

interface ResponseSuccess {
  info?: PageFavoriteDataResponse[];
  message: string;
}

interface GetParams {
  type: 'Get first page';
  name?: string;
}

interface LoadMoreParams {
  type: 'Load more';
  name?: string;
  cursor: string;
}
export const getFavorites = async ({ type, name, ...params }: GetParams | LoadMoreParams) => {
  let requestConfig: AxiosRequestConfig = {};
  if (type === 'Get first page') {
    requestConfig = {
      url: `${configureApp.endpoint.clients}/me/favorites`,
      method: 'GET',
      params: {
        favoriteType: 'PAGE',
        name: name === '' ? undefined : name,
      },
    };
  } else {
    const { cursor } = params as LoadMoreParams;
    requestConfig = {
      url: `${configureApp.endpoint.clients}/me/favorites`,
      method: 'GET',
      params: {
        favoriteType: 'PAGE',
        name: name === '' ? undefined : name,
        after: cursor,
      },
    };
  }
  const response: AxiosResponse<ResponseSuccess> = await fetchAPI.request(requestConfig);
  return response.data;
};
