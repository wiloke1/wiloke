import { AxiosResponse } from 'axios';
import configureApp from 'configureApp';
import { UserPlan } from 'types/Plan';
import fetchAPI from 'utils/functions/fetchAPI';

interface ResponseSuccess {
  info: UserPlan[];
  message: string;
}

export const getPlans = async () => {
  const response: AxiosResponse<ResponseSuccess> = await fetchAPI.request({
    url: `${configureApp.endpoint.clients}/publish/plans`,
  });
  return response.data;
};
