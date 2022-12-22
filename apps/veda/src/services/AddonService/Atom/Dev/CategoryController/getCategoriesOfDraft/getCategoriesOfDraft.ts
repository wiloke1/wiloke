import { AxiosResponse } from 'axios';
import { CategoryDataResponse } from 'services/SectionService/types';
import fetchAPI from 'utils/functions/fetchAPI';
import { baseUrl } from '../const';

interface GetCategoriesOfDraft {
  type: 'GET FIRST PAGE';
}

interface LoadmoreCategoriesOfDraft {
  type: 'LOADMORE';
  cursor: string;
}

interface ResponseSuccess {
  message: string;
  info: CategoryDataResponse[];
}

/** API được sử dụng để lấy về tất các category của "Addon Draft" */
export const getCategoriesOfDraft = async ({ type, ...params }: GetCategoriesOfDraft | LoadmoreCategoriesOfDraft) => {
  if (type === 'GET FIRST PAGE') {
    const response: AxiosResponse<ResponseSuccess> = await fetchAPI.request({
      url: `${baseUrl}`,
    });
    return response.data;
  } else {
    const { cursor } = params as LoadmoreCategoriesOfDraft;
    const response: AxiosResponse<ResponseSuccess> = await fetchAPI.request({
      url: `${baseUrl}/search`,
      params: {
        after: cursor,
      },
    });
    return response.data;
  }
};
