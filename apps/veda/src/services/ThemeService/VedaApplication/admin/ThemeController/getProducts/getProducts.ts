import { AxiosRequestConfig, AxiosResponse } from 'axios';
import { BE_ThemeProduct } from 'services/ThemeService/VedaApplication/types';
import fetchAPI from 'utils/functions/fetchAPI';
import { baseUrl } from '../const';

interface GetProducts {
  type: 'GET FIRST PAGE';
}

interface LoadmoreProducts {
  type: 'LOADMORE';
  cursor: string;
}

interface ResponseSuccess {
  message: string;
  info: BE_ThemeProduct[];
}

/** API để lấy về các theme product */
export const getProducts = async ({ type, ...params }: GetProducts | LoadmoreProducts) => {
  let requestConfig: AxiosRequestConfig = {};
  if (type === 'GET FIRST PAGE') {
    requestConfig = {
      url: `${baseUrl}`,
    };
  } else {
    const { cursor } = params as LoadmoreProducts;
    requestConfig = {
      url: `${baseUrl}/search`,
      params: {
        after: cursor,
      },
    };
  }
  const response: AxiosResponse<ResponseSuccess> = await fetchAPI.request(requestConfig);
  return response.data;
};
