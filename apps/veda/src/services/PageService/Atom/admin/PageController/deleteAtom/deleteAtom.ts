import { AxiosResponse } from 'axios';
import fetchAPI from 'utils/functions/fetchAPI';
import { baseUrl } from '../const';

interface DeleteAtom {
  /** CommandId của page atom cần xoá */
  commandId: string;
}

interface ResponseSuccess {
  message: string;
}

/** API được sử dụng để "Admin" xoá page atom */
export const deleteAtom = async ({ commandId }: DeleteAtom) => {
  const response: AxiosResponse<ResponseSuccess> = await fetchAPI.request({
    url: `${baseUrl}/${commandId}`,
    method: 'DELETE',
  });
  return response.data;
};
