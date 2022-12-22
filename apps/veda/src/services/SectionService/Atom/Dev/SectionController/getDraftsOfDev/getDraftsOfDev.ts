import { AxiosRequestConfig, AxiosResponse } from 'axios';
import { DevSection } from 'types/Sections';
import fetchAPI from 'utils/functions/fetchAPI';
import { baseUrl } from '../const';

interface GetDraftsOfDev {
  type: 'GET FIRST PAGE';
}

interface LoadmoreDraftsOfDev {
  type: 'LOADMORE';
  categoryCommandId?: string;
  categoryName?: string;
  label?: string;
  /** Cursor để loadmore */
  lastCursor: string;
  sectionStatus?: DevSection['status'];
}

interface ResponseSuccess {
  info: DevSection[];
  message: string;
}

/** API được sử dụng để có thể lấy được các "Section Drafts của Dev" */
export const getDraftsOfDev = async ({ type, ...params }: GetDraftsOfDev | LoadmoreDraftsOfDev) => {
  let requestConfig: AxiosRequestConfig = {};
  if (type === 'GET FIRST PAGE') {
    requestConfig = {
      url: `${baseUrl}`,
      params: {
        size: 20,
      },
    };
  } else {
    const { lastCursor, categoryCommandId, categoryName, label, sectionStatus } = params as LoadmoreDraftsOfDev;
    requestConfig = {
      url: `${baseUrl}/search`,
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
