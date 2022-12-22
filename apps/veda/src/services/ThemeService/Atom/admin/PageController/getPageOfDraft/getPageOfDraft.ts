import { AxiosResponse } from 'axios';
import { BE_PageInThemeAtom } from 'services/ThemeService/Atom/types';
import fetchAPI from 'utils/functions/fetchAPI';
import { baseUrl } from '../const';

interface GetPageOfDraft {
  /** CommandId của page cần lấy dữ liệu */
  commandId: string;
}

interface ResponseSuccess {
  message: string;
  info: BE_PageInThemeAtom;
}

/** API được sử dụng để lấy về dữ liệu của page - được clone từ page atom - được sử dụng trong theme draft theo commandId */
export const getPageOfDraft = async ({ commandId }: GetPageOfDraft) => {
  const response: AxiosResponse<ResponseSuccess> = await fetchAPI.request({
    url: `${baseUrl}/drafts/${commandId}`,
  });
  return response.data;
};
