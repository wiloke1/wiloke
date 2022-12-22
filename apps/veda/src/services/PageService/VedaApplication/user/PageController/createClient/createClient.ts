import { AxiosResponse } from 'axios';
import { BE_PageClient } from 'services/PageService/VedaApplication/types';
import { ToRequiredKeys } from 'utils';
import fetchAPI from 'utils/functions/fetchAPI';
import { clientBaseUrl } from '../const';

interface CreateClient {
  /** Dữ liệu sẽ được apply vào record */
  page: ToRequiredKeys<Partial<Omit<BE_PageClient, 'commandId'>>, 'image' | 'label' | 'pageSettings' | 'sectionCommandIds' | 'type'>;
}

interface ResponseSuccess {
  message: string;
  info: BE_PageClient;
}

export const createClient = async ({ page }: CreateClient) => {
  const response: AxiosResponse<ResponseSuccess> = await fetchAPI.request({
    url: `${clientBaseUrl}`,
    method: 'POST',
    data: page,
  });
  return response.data;
};
