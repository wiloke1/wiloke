import { AxiosResponse } from 'axios';
import { BE_PageClient } from 'services/PageService/VedaApplication/types';
import { ToRequiredKeys } from 'utils';
import fetchAPI from 'utils/functions/fetchAPI';
import { clientBaseUrl } from '../const';

interface UpdateClient {
  /** Dữ liệu sẽ được apply vào record */
  page: ToRequiredKeys<Partial<BE_PageClient>, 'commandId'>;
}

interface ResponseSuccess {
  message: string;
  info: BE_PageClient;
}

export const updateClient = async ({ page }: UpdateClient) => {
  const { commandId } = page;
  const response: AxiosResponse<ResponseSuccess> = await fetchAPI.request({
    url: `${clientBaseUrl}/${commandId}`,
    method: 'PUT',
    data: page,
  });
  return response.data;
};
