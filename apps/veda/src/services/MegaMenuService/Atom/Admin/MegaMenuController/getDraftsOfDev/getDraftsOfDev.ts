import { AxiosRequestConfig, AxiosResponse } from 'axios';
import { DevSection } from 'types/Sections';
import fetchAPI from 'utils/functions/fetchAPI';
import { baseUrl } from '../const';

interface GetDraftsOfDev {
  type: 'GET FIRST PAGE';
  /** Lọc "Section Atom" theo category */
  category: string;
}
interface LoadmoreDraftsOfDev {
  type: 'LOADMORE';
  /** Lọc "Section Atom" theo category */
  category: string;
  /** Cursor để loadmore */
  lastCursor: string;
}

interface ResponseSuccess {
  info: DevSection[];
  message: string;
}

/** API được sử dụng để "Admin" có thể lấy được các "Section Drafts của Devs" */
export const getDraftsOfDev = async ({ type, ...params }: GetDraftsOfDev | LoadmoreDraftsOfDev) => {
  let requestConfig: AxiosRequestConfig = {};
  if (type === 'GET FIRST PAGE') {
    const { category } = params as GetDraftsOfDev;
    requestConfig = {
      url: `${baseUrl}/drafts`,
      params: {
        categoryName: category !== '' ? category : undefined,
      },
    };
  } else {
    const { category, lastCursor } = params as LoadmoreDraftsOfDev;
    requestConfig = {
      url: `${baseUrl}/drafts/search`,
      params: {
        categoryName: category !== '' ? category : undefined,
        after: lastCursor,
        status: 'DRAFT',
      },
    };
  }
  const response: AxiosResponse<ResponseSuccess> = await fetchAPI.request(requestConfig);
  return response.data;
};
