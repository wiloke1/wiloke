import { AxiosResponse } from 'axios';
import fetchAPI from 'utils/functions/fetchAPI';
import { baseUrl } from '../const';

interface DeleteDraftOfDev {
  /** CommandId của theme draft cần xoá */
  commandId: string;
}

interface ResponseSuccess {
  message: string;
}

/** API được sử dụng để "Dev" xoá theme draft của chính mình tạo ra */
export const deleteDraftOfDev = async ({ commandId }: DeleteDraftOfDev) => {
  const response: AxiosResponse<ResponseSuccess> = await fetchAPI.request({
    url: `${baseUrl}/${commandId}`,
    method: 'DELETE',
  });
  return response.data;
};
