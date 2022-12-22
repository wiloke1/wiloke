import { AxiosRequestConfig, AxiosResponse } from 'axios';
import { BE_PageClient, RequestGetPagesClient } from 'services/PageService/VedaApplication/types';
import fetchAPI from 'utils/functions/fetchAPI';
import { clientBaseUrl } from '../const';

interface GetClients extends RequestGetPagesClient {
  type: 'GET FIRST PAGE';
  userId?: number;
}
interface LoadmoreClients extends RequestGetPagesClient {
  type: 'LOADMORE';
  /** Cursor để loadmore */
  lastCursor: string;
  userId?: number;
}

interface ResponseSuccess {
  message: string;
  info: BE_PageClient[];
}

/** API được sử dụng để lấy về dữ liệu của page client */
export const getClients = async ({ type, pageType, enable, userId, label, ...params }: GetClients | LoadmoreClients) => {
  let requestConfig: AxiosRequestConfig = {};
  if (type === 'GET FIRST PAGE') {
    requestConfig = {
      url: `${clientBaseUrl}/search`,
      params: {
        type: pageType,
        enable,
        label: label === '' ? undefined : label,
        userId,
      },
    };
  } else {
    const { lastCursor } = params as LoadmoreClients;
    requestConfig = {
      url: `${clientBaseUrl}/search`,
      params: {
        after: lastCursor,
        type: pageType,
        enable,
        label: label === '' ? undefined : label,
        userId,
      },
    };
  }
  const response: AxiosResponse<ResponseSuccess> = await fetchAPI.request(requestConfig);
  return response.data;
};
