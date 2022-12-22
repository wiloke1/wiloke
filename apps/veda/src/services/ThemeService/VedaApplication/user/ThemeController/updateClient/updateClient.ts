import { AxiosResponse } from 'axios';
import { BE_ThemeClient } from 'services/ThemeService/VedaApplication/types';
import { ToRequiredKeys } from 'utils';
import fetchAPI from 'utils/functions/fetchAPI';
import { clientBaseUrl } from '../const';

interface UpdateClient {
  /** Dữ liệu sẽ được apply vào record */
  theme: ToRequiredKeys<Partial<BE_ThemeClient>, 'commandId'>;
}

interface ResponseSuccess {
  message: string;
  info: BE_ThemeClient;
}

export const updateClient = async ({ theme }: UpdateClient) => {
  const { commandId } = theme;
  const response: AxiosResponse<ResponseSuccess> = await fetchAPI.request({
    url: `${clientBaseUrl}/${commandId}`,
    method: 'PUT',
    data: theme,
  });
  return response.data;
};
