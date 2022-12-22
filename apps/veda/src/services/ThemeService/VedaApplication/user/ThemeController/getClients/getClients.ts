import { AxiosRequestConfig, AxiosResponse } from 'axios';
import { BE_ThemeClient } from 'services/ThemeService/VedaApplication/types';
import fetchAPI from 'utils/functions/fetchAPI';
import { clientBaseUrl } from '../const';

interface GetClients {
  type: 'GET FIRST PAGE';
}
interface LoadmoreClients {
  type: 'LOADMORE';
  /** Cursor để loadmore */
  lastCursor: string;
}

interface ResponseSuccess {
  message: string;
  info: BE_ThemeClient[];
}

/** API được sử dụng để lấy về dữ liệu của theme client */
export const getClients = async ({ type, ...params }: GetClients | LoadmoreClients) => {
  let requestConfig: AxiosRequestConfig = {};
  if (type === 'GET FIRST PAGE') {
    requestConfig = {
      url: `${clientBaseUrl}`,
      params: {
        size: 5,
      },
    };
  } else {
    const { lastCursor } = params as LoadmoreClients;
    requestConfig = {
      url: `${clientBaseUrl}/search`,
      params: {
        after: lastCursor,
        size: 5,
      },
    };
  }
  const response: AxiosResponse<ResponseSuccess> = await fetchAPI.request(requestConfig);
  return response.data;
};
