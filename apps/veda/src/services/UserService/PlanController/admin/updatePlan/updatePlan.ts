import { AxiosResponse } from 'axios';
import { UserPlan } from 'types/Plan';
import fetchAPI from 'utils/functions/fetchAPI';
import { baseUrl } from '../const';

interface Params extends UserPlan {}

interface ResponseSuccess {
  info: UserPlan;
  message: string;
}

export const updatePlan = async (params: Params) => {
  const response: AxiosResponse<ResponseSuccess> = await fetchAPI.request({
    url: `${baseUrl}/${params.commandId}`,
    method: 'PUT',
    data: {
      ...params,
    },
  });
  return response.data;
};
