import { AxiosResponse } from 'axios';
import fetchAPI from 'utils/functions/fetchAPI';
import { clientBaseUrl } from '../const';

interface DeleteClient {
  /** CommandId của theme client cần xoá */
  commandId: string;
}

interface ResponseSuccess {
  message: string;
}

/** API được sử dụng để xoá theme client */
export const deleteClient = async ({ commandId }: DeleteClient) => {
  const response: AxiosResponse<ResponseSuccess> = await fetchAPI.request({
    url: `${clientBaseUrl}/${commandId}`,
    method: 'DELETE',
  });
  return response.data;
};
