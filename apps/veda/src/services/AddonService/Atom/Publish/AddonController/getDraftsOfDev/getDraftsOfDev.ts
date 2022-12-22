import { AxiosRequestConfig, AxiosResponse } from 'axios';
import { DevAddon } from 'types/Addons';
import fetchAPI from 'utils/functions/fetchAPI';
import { baseUrl } from '../const';

interface GetDraftsOfDev {
  type: 'GET FIRST PAGE';
  /** Lọc "Addon Atom" theo category */
  category: string;
}
interface LoadmoreDraftsOfDev {
  type: 'LOADMORE';
  /** Lọc "Addon Atom" theo category */
  category: string;
  /** Cursor để loadmore */
  lastCursor: string;
}

interface ResponseSuccess {
  info: DevAddon[];
  message: string;
}

/** API được sử dụng để "Admin" có thể lấy được các "Addon Drafts của Devs" */
export const getDraftsOfDev = async ({ type, ...params }: GetDraftsOfDev | LoadmoreDraftsOfDev) => {
  let requestConfig: AxiosRequestConfig = {};
  if (type === 'GET FIRST PAGE') {
    const { category } = params as GetDraftsOfDev;
    requestConfig = {
      url: `${baseUrl}/drafts`,
      params: {
        category,
      },
    };
  } else {
    const { category, lastCursor } = params as LoadmoreDraftsOfDev;
    requestConfig = {
      url: `${baseUrl}/drafts/search`,
      params: {
        category,
        after: lastCursor,
      },
    };
  }
  const response: AxiosResponse<ResponseSuccess> = await fetchAPI.request(requestConfig);

  return response.data;
};
