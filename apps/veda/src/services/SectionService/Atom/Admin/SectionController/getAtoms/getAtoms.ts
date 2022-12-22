import { AxiosRequestConfig, AxiosResponse } from 'axios';
import { AdminSection } from 'types/Sections';
import fetchAPI from 'utils/functions/fetchAPI';
import { baseUrl } from '../const';

interface ResponseSuccess {
  info: AdminSection[];
  message: string;
}
interface GetAtoms {
  type: 'GET FIRST PAGE';
}
interface LoadmoreAtoms {
  type: 'LOADMORE';
  /** Cursor để loadmore */
  lastCursor: string;
  categoryCommandId?: string;
  categoryName?: string;
  label?: string;
}

/** API lấy về các template section đã được duyệt bởi "Admin" lên cho đội "Devs" sử dụng build template */
export const getAtoms = async ({ type, ...params }: GetAtoms | LoadmoreAtoms) => {
  let requestConfig: AxiosRequestConfig = {};
  if (type === 'GET FIRST PAGE') {
    requestConfig = {
      url: `${baseUrl}`,
      params: {
        size: 20,
      },
    };
  } else {
    const { lastCursor, categoryCommandId, categoryName, label } = params as LoadmoreAtoms;
    requestConfig = {
      url: `${baseUrl}/search`,
      params: {
        size: 20,
        after: lastCursor,
        categoryCommandId: categoryCommandId && categoryCommandId !== '' ? categoryCommandId : undefined,
        categoryName: categoryName && categoryName !== '' ? categoryName : undefined,
        label: label && label !== '' ? label : undefined,
      },
    };
  }

  const response: AxiosResponse<ResponseSuccess> = await fetchAPI.request(requestConfig);

  return response.data;
};
