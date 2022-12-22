import { AxiosResponse } from 'axios';
import fetchAPI from 'utils/functions/fetchAPI';
import { baseUrl } from '../const';

interface Params {
  chargeId: string;
}

interface ResponseSuccess {
  info: {
    confirmation_url: string;
  };
  message: string;
  status: string;
}

export const verifyAfterUpdatePlan = async ({ chargeId }: Params) => {
  const response: AxiosResponse<ResponseSuccess> = await fetchAPI.request({
    url: `${baseUrl}/subscriptions/${chargeId}`,
    method: 'PUT',
  });
  return response.data;
};
