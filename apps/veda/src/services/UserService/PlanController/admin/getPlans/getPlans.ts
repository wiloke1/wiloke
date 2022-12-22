import { AxiosResponse } from 'axios';
import { UserPlan } from 'types/Plan';
import fetchAPI from 'utils/functions/fetchAPI';
import { baseUrl } from '../const';

interface ResponseSuccess {
  info: UserPlan[];
  message: string;
}

export const getPlans = async () => {
  const response: AxiosResponse<ResponseSuccess> = await fetchAPI.request({
    url: baseUrl,
  });
  return response.data;
};
