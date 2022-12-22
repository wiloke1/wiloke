import { AxiosRequestConfig, AxiosResponse } from 'axios';
import { BE_PageProduct } from 'services/PageService/VedaApplication/types';
import { PageType } from 'types/Page';
import fetchAPI from 'utils/functions/fetchAPI';
import { baseUrl } from '../const';

interface GetProducts {
  type: 'GET FIRST PAGE';
  pageType?: PageType;
  label?: string;
  categoryId?: string;
  saved?: boolean;
}

interface LoadmoreProducts {
  type: 'LOADMORE';
  cursor: string;
  pageType?: PageType;
  label?: string;
  categoryId?: string;
  saved?: boolean;
}

interface ResponseSuccess {
  message: string;
  info: BE_PageProduct[];
}

/** API để lấy về các page product */
export const getProducts = async ({ type, pageType, saved, categoryId, label, ...params }: GetProducts | LoadmoreProducts) => {
  let requestConfig: AxiosRequestConfig = {};
  if (type === 'GET FIRST PAGE') {
    requestConfig = {
      url: `${baseUrl}/search`,
      params: {
        type: pageType,
        label: label === '' ? undefined : label,
        categoryId,
        saved,
      },
    };
  } else {
    const { cursor } = params as LoadmoreProducts;
    requestConfig = {
      url: `${baseUrl}/search`,
      params: {
        after: cursor,
        type: pageType,
        categoryId,
        label: label === '' ? undefined : label,
        saved,
      },
    };
  }
  const response: AxiosResponse<ResponseSuccess> = await fetchAPI.request(requestConfig);
  return response.data;
};
