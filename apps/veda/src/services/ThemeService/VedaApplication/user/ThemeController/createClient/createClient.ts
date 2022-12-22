import { AxiosResponse } from 'axios';
import { BE_ThemeClient } from 'services/ThemeService/VedaApplication/types';
import fetchAPI from 'utils/functions/fetchAPI';
import { clientBaseUrl } from '../const';

interface CreateClient {
  /** Dữ liệu sẽ được apply vào record */
  theme: Partial<Omit<BE_ThemeClient, 'commandId'>>;
}

interface ResponseSuccess {
  message: string;
  info: BE_ThemeClient;
}

export const createClient = async ({ theme }: CreateClient) => {
  const response: AxiosResponse<ResponseSuccess> = await fetchAPI.request({
    url: `${clientBaseUrl}`,
    method: 'POST',
    data: theme,
  });
  return response.data;
};
