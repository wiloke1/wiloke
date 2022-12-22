import { AxiosResponse } from 'axios';
import { CategoryDataResponse } from 'services/SectionService/types';
import fetchAPI from 'utils/functions/fetchAPI';
import { baseUrl } from '../const';

interface GetCategoriesOfProduct {
  type: 'GET FIRST PAGE';
}

interface LoadmoreCategoriesOfProduct {
  type: 'LOADMORE';
  cursor: string;
}

interface ResponseSuccess {
  message: string;
  info: CategoryDataResponse[];
}

/** API được sử dụng để lấy về tất các category của "Addon Product" */
export const getCategories = async ({ type, ...params }: GetCategoriesOfProduct | LoadmoreCategoriesOfProduct) => {
  if (type === 'GET FIRST PAGE') {
    const response: AxiosResponse<ResponseSuccess> = await fetchAPI.request({
      url: `${baseUrl}`,
    });
    return response.data;
  } else {
    const { cursor } = params as LoadmoreCategoriesOfProduct;
    const response: AxiosResponse<ResponseSuccess> = await fetchAPI.request({
      url: `${baseUrl}/search`,
      params: {
        after: cursor,
      },
    });
    return response.data;
  }
};
