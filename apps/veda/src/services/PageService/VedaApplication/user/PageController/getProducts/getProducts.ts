import { AxiosRequestConfig, AxiosResponse } from 'axios';
import { BE_PageProduct, RequestGetPagesClient } from 'services/PageService/VedaApplication/types';
import fetchAPI from 'utils/functions/fetchAPI';
import { baseUrl } from '../const';

interface GetProducts extends RequestGetPagesClient {
  type: 'GET FIRST PAGE';
}

interface LoadmoreProducts extends RequestGetPagesClient {
  type: 'LOADMORE';
  cursor: string;
}

interface ResponseSuccess {
  message: string;
  info: BE_PageProduct[];
}

/** API để lấy về các page product */
export const getProducts = async ({ type, pageType, enable, label, ...params }: GetProducts | LoadmoreProducts) => {
  let requestConfig: AxiosRequestConfig = {};
  if (type === 'GET FIRST PAGE') {
    requestConfig = {
      url: `${baseUrl}`,
      params: {
        type: pageType,
        enable,
        label,
      },
    };
  } else {
    const { cursor } = params as LoadmoreProducts;
    requestConfig = {
      url: `${baseUrl}/search`,
      params: {
        after: cursor,
        type: pageType,
        enable,
        label,
      },
    };
  }
  const response: AxiosResponse<ResponseSuccess> = await fetchAPI.request(requestConfig);
  return response.data;
};
