import { AxiosResponse } from 'axios';
import { BE_ThemeDraft } from 'services/ThemeService/Atom/types';
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
  info: BE_ThemeDraft[];
}

/** API được sử dụng để "Admin" lấy tất cả các theme drafts - theme mà đang được "Devs" sửa */
export const getDraftsOfDev = async ({ type, ...params }: GetDraftsOfDev | LoadmoreDraftsOfDev) => {
  let requestConfig = {};
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
