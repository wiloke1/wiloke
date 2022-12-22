import { AxiosResponse } from 'axios';
import fetchAPI from 'utils/functions/fetchAPI';
import { baseUrl } from '../const';
import { BE_PageDraft } from '../../../types';

interface GetDraftOfDev {
  /** CommandId của page draft cần lấy dữ liệu */
  commandId: string;
}

interface ResponseSuccess {
  message: string;
  info: BE_PageDraft;
}

/** API để "Admin" có thể lấy dữ liệu "Page Draft" của "Devs" -> Phục vụ cho chức năng "Admin" có thể sửa "Page mà Devs đang sửa" */
export const getDraftOfDev = async ({ commandId }: GetDraftOfDev) => {
  const response: AxiosResponse<ResponseSuccess> = await fetchAPI.request({
    url: `${baseUrl}/drafts/${commandId}`,
  });
  return response.data;
};
