import { AxiosResponse } from 'axios';
import fetchAPI from 'utils/functions/fetchAPI';
import { baseUrl } from '../const';

interface Params {
  commandId: string;
}

interface ResponseSuccess {
  message: string;
}

export const deleteFavorite = async ({ commandId }: Params) => {
  const response: AxiosResponse<ResponseSuccess> = await fetchAPI.request({
    url: `${baseUrl}/favorites/${commandId}`,
    method: 'DELETE',
  });
  return response.data;
};
