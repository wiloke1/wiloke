import { AxiosRequestConfig, AxiosResponse } from 'axios';
import { DevSection } from 'types/Sections';
import fetchAPI from 'utils/functions/fetchAPI';
import { baseUrl } from '../const';

interface GetDraftsOfDev {
  type: 'GET FIRST PAGE';
}
interface LoadmoreDraftsOfDev {
  type: 'LOADMORE';
  /** Cursor để loadmore */
  lastCursor: string;
  categoryCommandId?: string;
  categoryName?: string;
  label?: string;
  sectionStatus?: DevSection['status'];
}

interface ResponseSuccess {
  info: DevSection[];
  message: string;
}

/** API được sử dụng để "Admin" có thể lấy được các "Section Drafts của Devs" */
export const getDraftsOfDev = async ({ type, ...params }: GetDraftsOfDev | LoadmoreDraftsOfDev) => {
  let requestConfig: AxiosRequestConfig = {};
  if (type === 'GET FIRST PAGE') {
    requestConfig = {
      url: `${baseUrl}/drafts`,
      params: {
        size: 20,
      },
    };
  } else {
    const { lastCursor, categoryCommandId, categoryName, label, sectionStatus } = params as LoadmoreDraftsOfDev;
    requestConfig = {
      url: `${baseUrl}/drafts/search`,
      params: {
        size: 20,
        after: lastCursor,
        categoryCommandId,
        categoryName,
        label,
        sectionStatus,
      },
    };
  }
  const response: AxiosResponse<ResponseSuccess> = await fetchAPI.request(requestConfig);

  return response.data;
};
