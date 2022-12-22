import { AxiosRequestConfig, AxiosResponse } from 'axios';
import { BE_PageDraft } from 'services/PageService/Atom/types';
import fetchAPI from 'utils/functions/fetchAPI';
import { baseUrl } from '../const';

interface GetDraftsOfDev {
  type: 'GET FIRST PAGE';
}

interface LoadmoreDraftsOfDev {
  type: 'LOADMORE';
  cursor: string;
}

interface ResponseSuccess {
  message: string;
  info: BE_PageDraft[];
}

/** API được sử dụng để "Dev" lấy về các page draft */
export const getDraftsOfDev = async ({ type, ...params }: GetDraftsOfDev | LoadmoreDraftsOfDev) => {
  let requestConfig: AxiosRequestConfig = {};
  if (type === 'GET FIRST PAGE') {
    requestConfig = {
      url: `${baseUrl}`,
    };
  } else {
    const { cursor } = params as LoadmoreDraftsOfDev;
    requestConfig = {
      url: `${baseUrl}/search`,
      params: { after: cursor },
    };
  }
  const response: AxiosResponse<ResponseSuccess> = await fetchAPI.request(requestConfig);
  return response.data;
};
