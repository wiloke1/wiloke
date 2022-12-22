import { AxiosResponse } from 'axios';
import configureApp from 'configureApp';
import fetchAPI from 'utils/functions/fetchAPI';

interface Params {
  commandId: string;
}

interface ResponseSuccess {
  message: string;
}

export const deleteFavorite = async ({ commandId }: Params) => {
  const response: AxiosResponse<ResponseSuccess> = await fetchAPI.request({
    url: `${configureApp.endpoint.clients}/me/favorites/${commandId}`,
    method: 'DELETE',
  });
  return response.data;
};
