import { AxiosResponse } from 'axios';
import { BE_PageInThemeAtom } from 'services/ThemeService/Atom/types';
import fetchAPI from 'utils/functions/fetchAPI';
import { baseUrl } from '../const';

interface GetPageOfAtom {
  /** CommandId của page cần lấy dữ liệu */
  commandId: string;
}

interface ResponseSuccess {
  message: string;
  info: BE_PageInThemeAtom;
}

/** API được sử dụng để lấy về dữ liệu của page - được clone từ page atom - được sử dụng trong theme atom theo commandId */
export const getPageOfAtom = async ({ commandId }: GetPageOfAtom) => {
  const response: AxiosResponse<ResponseSuccess> = await fetchAPI.request({
    url: `${baseUrl}/${commandId}`,
  });
  return response.data;
};
