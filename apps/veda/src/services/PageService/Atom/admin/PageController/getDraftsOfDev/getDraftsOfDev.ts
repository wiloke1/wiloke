import { AxiosRequestConfig, AxiosResponse } from 'axios';
import fetchAPI from 'utils/functions/fetchAPI';
import { baseUrl } from '../const';
import { BE_PageDraft } from '../../../types';

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

/** API được sử dụng để "Admin" lấy tất cả các page drafts - page mà đang được "Devs" sửa */
export const getDraftsOfDev = async ({ type, ...params }: GetDraftsOfDev | LoadmoreDraftsOfDev) => {
  let requestConfig: AxiosRequestConfig = {};
  if (type === 'GET FIRST PAGE') {
    requestConfig = {
      url: `${baseUrl}/drafts`,
    };
  } else {
    const { cursor } = params as LoadmoreDraftsOfDev;
    requestConfig = {
      url: `${baseUrl}/drafts/search`,
      params: {
        after: cursor,
      },
    };
  }
  const response: AxiosResponse<ResponseSuccess> = await fetchAPI.request(requestConfig);
  return response.data;
};
