import { AxiosResponse } from 'axios';
import fetchAPI from 'utils/functions/fetchAPI';
import { baseUrl } from '../const';

interface DeleteClient {
  /** CommandId của addon cần xoá */
  commandId: string;
}

interface ResponseSuccess {
  message: string;
}

/** API được sử dụng để client xoá addon */
export const deleteClient = async ({ commandId }: DeleteClient) => {
  const response: AxiosResponse<ResponseSuccess> = await fetchAPI.request({
    url: `${baseUrl}/${commandId}`,
    method: 'DELETE',
  });
  return response.data;
};
