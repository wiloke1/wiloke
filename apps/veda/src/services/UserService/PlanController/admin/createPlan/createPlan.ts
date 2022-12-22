import { AxiosResponse } from 'axios';
import { UserPlan } from 'types/Plan';
import fetchAPI from 'utils/functions/fetchAPI';
import { baseUrl } from '../const';

interface Params extends Omit<UserPlan, 'commandId'> {}

interface ResponseSuccess {
  info: UserPlan;
  message: string;
}

export const createPlan = async (params: Params) => {
  const response: AxiosResponse<ResponseSuccess> = await fetchAPI.request({
    url: baseUrl,
    method: 'POST',
    data: {
      ...params,
    },
  });
  return response.data;
};
