import { AxiosResponse } from 'axios';
import { BE_ThemeClient } from 'services/ThemeService/VedaApplication/types';
import fetchAPI from 'utils/functions/fetchAPI';
import { clientBaseUrl } from '../const';

interface GetClient {
  commandId: string;
}

interface ResponseSuccess {
  message: string;
  info: BE_ThemeClient;
}

export const getClient = async ({ commandId }: GetClient) => {
  const response: AxiosResponse<ResponseSuccess> = await fetchAPI.request({
    url: `${clientBaseUrl}/${commandId}`,
  });
  return response.data;
};
