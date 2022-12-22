import { AxiosResponse } from 'axios';
import { PageType } from 'types/Page';
import fetchAPI from 'utils/functions/fetchAPI';
import { clientBaseUrl } from '../const';

interface ResponseSuccess {
  message: string;
  info: Record<PageType, number>;
}

export const getCoutner = async () => {
  const response: AxiosResponse<ResponseSuccess> = await fetchAPI.request({
    url: `${clientBaseUrl}/counter`,
  });

  return response.data;
};
