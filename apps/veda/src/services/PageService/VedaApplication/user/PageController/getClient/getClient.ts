import { AxiosResponse } from 'axios';
import { BE_PageClient } from 'services/PageService/VedaApplication/types';
import fetchAPI from 'utils/functions/fetchAPI';
import { clientBaseUrl } from '../const';

interface GetClient {
  commandId: string;
}

interface ResponseSuccess {
  message: string;
  info: BE_PageClient;
}

/** API được sử dụng để lấy về dữ liệu của page client */
export const getClient = async ({ commandId }: GetClient) => {
  const response: AxiosResponse<ResponseSuccess> = await fetchAPI.request({
    url: `${clientBaseUrl}/${commandId}`,
  });
  return response.data;
};
