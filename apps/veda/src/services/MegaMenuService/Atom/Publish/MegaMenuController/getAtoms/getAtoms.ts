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
  /** Lọc "Section Atom" theo category */
  category: string;
}
interface LoadmoreAtoms {
  type: 'LOADMORE';
  /** Lọc "Section Atom" theo category */
  category: string;
  /** Cursor để loadmore */
  lastCursor: string;
}

/** API lấy về các template section đã được duyệt bởi "Admin" lên cho đội "Devs" sử dụng build template */
export const getAtoms = async ({ type, ...params }: GetAtoms | LoadmoreAtoms) => {
  let requestConfig: AxiosRequestConfig = {};
  if (type === 'GET FIRST PAGE') {
    const { category } = params;
    requestConfig = {
      url: `${baseUrl}`,
      params: {
        size: 20,
        categoryName: category !== '' ? category : undefined,
      },
    };
  } else {
    const { category, lastCursor } = params as LoadmoreAtoms;
    requestConfig = {
      url: `${baseUrl}/search`,
      params: {
        size: 20,
        categoryName: category !== '' ? category : undefined,
        after: lastCursor,
      },
    };
  }

  const response: AxiosResponse<ResponseSuccess> = await fetchAPI.request(requestConfig);

  return response.data;
};
