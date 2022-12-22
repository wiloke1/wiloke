import { AxiosRequestConfig, AxiosResponse } from 'axios';
import { BE_ThemeAtom } from 'services/ThemeService/Atom/types';
import fetchAPI from 'utils/functions/fetchAPI';
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
  info: BE_ThemeAtom[];
}

/** API được sử dụng để lấy về các theme atom đã được "Admin" duyệt */
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
