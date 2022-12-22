import { AxiosResponse } from 'axios';
import { DevAddon } from 'types/Addons';
import fetchAPI from 'utils/functions/fetchAPI';
import { baseUrl } from '../const';

interface GetDraftOfDev {
  /** CommandId của section draft của dev cần lấy dữ liệu */
  commandId: string;
}

interface ResponseSuccess {
  message: string;
  info: DevAddon;
}

/** API để "Admin" có thể lấy dữ liệu "Addon Draft" của "Devs" -> Phục vụ cho chức năng "Admin" có thể sửa "Addon mà Devs đang sửa" */
export const getDraftOfDev = async ({ commandId }: GetDraftOfDev) => {
  const response: AxiosResponse<ResponseSuccess> = await fetchAPI.request({
    url: `${baseUrl}/drafts/${commandId}`,
  });

  return response.data;
};
