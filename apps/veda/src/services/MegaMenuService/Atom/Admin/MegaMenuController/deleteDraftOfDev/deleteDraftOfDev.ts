import { AxiosResponse } from 'axios';
import fetchAPI from 'utils/functions/fetchAPI';
import { baseUrl } from '../const';

interface DeleteDraftOfDev {
  /** CommandId của section draft cần xoá */
  commandId: string;
}

interface ResponseSuccess {
  message: string;
}

/** API được sử dụng để "Admin" xoá "Section Draft" */
export const deleteDraftOfDev = async ({ commandId }: DeleteDraftOfDev) => {
  const response: AxiosResponse<ResponseSuccess> = await fetchAPI.request({
    url: `${baseUrl}/drafts/${commandId}`,
    method: 'DELETE',
  });

  return response.data;
};
