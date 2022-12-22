import { AxiosResponse } from 'axios';
import fetchAPI from 'utils/functions/fetchAPI';
import { baseUrl } from '../const';

interface ResponseSuccess {
  info: {
    confirmation_url: string;
  };
  message: string;
  status: string;
}

export const downgradeToFree = async () => {
  const response: AxiosResponse<ResponseSuccess> = await fetchAPI.request({
    url: `${baseUrl}/subscriptions/free`,
    method: 'PUT',
  });

  return response.data;
};
