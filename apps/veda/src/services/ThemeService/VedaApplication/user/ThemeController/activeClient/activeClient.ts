import { AxiosResponse } from 'axios';
import { BE_ThemeClient } from 'services/ThemeService/VedaApplication/types';
import fetchAPI from 'utils/functions/fetchAPI';
import { clientBaseUrl } from '../const';

interface ActiveClient {
  commandId: string;
}

interface ResponseSuccess {
  message: string;
  info: BE_ThemeClient;
}

export const activeClient = async ({ commandId }: ActiveClient) => {
  const response: AxiosResponse<ResponseSuccess> = await fetchAPI.request({
    url: `${clientBaseUrl}/${commandId}`,
    method: 'PUT',
    data: {
      status: 'publish',
    },
  });
  return response.data;
};
