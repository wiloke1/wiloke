import { AxiosRequestConfig, AxiosResponse } from 'axios';
import fetchAPI from 'utils/functions/fetchAPI';
import { BE_PageAtom } from '../../../types';
import { baseUrl } from '../const';

interface GetAtoms {
  type: 'GET FIRST PAGE';
}

interface LoadmoreAtoms {
  type: 'LOADMORE';
  cursor: string;
}

interface ResponseSuccess {
  message: string;
  info: BE_PageAtom[];
}

/** API được sử dụng để lấy về các page atom */
export const getAtoms = async ({ type, ...params }: GetAtoms | LoadmoreAtoms) => {
  let requestConfig: AxiosRequestConfig = {};
  if (type === 'GET FIRST PAGE') {
    requestConfig = {
      url: `${baseUrl}`,
    };
  } else {
    const { cursor } = params as LoadmoreAtoms;
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
