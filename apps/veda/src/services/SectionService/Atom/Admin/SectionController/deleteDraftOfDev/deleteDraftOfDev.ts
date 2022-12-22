import { AxiosResponse } from 'axios';
import fetchAPI from 'utils/functions/fetchAPI';
import { baseUrl } from '../const';

interface DeleteDraft {
  /** CommandId của section cần xoá */
  commandId: string;
}

interface ResponseSuccess {
  message: string;
}

/** API được sử dụng để "Admin" xoá "Section Atom" */
export const deleteDraftOfDev = async ({ commandId }: DeleteDraft) => {
  const response: AxiosResponse<ResponseSuccess> = await fetchAPI.request({
    url: `${baseUrl}/drafts/${commandId}`,
    method: 'DELETE',
  });
  return response.data;
};
