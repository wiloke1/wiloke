import { AxiosRequestConfig, AxiosResponse } from 'axios';
import fetchAPI from 'utils/functions/fetchAPI';
import { GetSnippetsServiceResponse } from '../type';
import { baseUrl } from './const';

interface GetParams {
  type: 'Get first page';
  keyword?: string;
  fileNames?: string[];
  size?: number;
}

interface LoadMoreParams {
  type: 'Load more';
  page: number;
  keyword?: string;
  fileNames?: string[];
  size?: number;
}

export const getSnippets = async ({ type, ...params }: GetParams | LoadMoreParams) => {
  let requestConfig: AxiosRequestConfig = {};
  if (type === 'Get first page') {
    const { fileNames, keyword, size } = params;
    requestConfig = {
      url: `${baseUrl}`,
      params: {
        fileNames,
        keyword,
        size: size ? size : 100,
      },
    };
  } else {
    const { fileNames, keyword, size, page } = params as LoadMoreParams;
    requestConfig = {
      url: `${baseUrl}/search`,
      params: {
        fileNames,
        keyword,
        size,
        page,
      },
    };
  }

  const response: AxiosResponse<GetSnippetsServiceResponse> = await fetchAPI.request(requestConfig);
  return response.data;
};
