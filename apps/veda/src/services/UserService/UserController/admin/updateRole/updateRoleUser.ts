import { AxiosResponse } from 'axios';
import fetchAPI from 'utils/functions/fetchAPI';
import { baseUrl } from '../const';

interface Params {
  userId: number;
  role: string;
}

interface ResponseSuccess {
  message: string;
}

export const updateRoleUser = async ({ role, userId }: Params) => {
  const response: AxiosResponse<ResponseSuccess> = await fetchAPI.request({
    url: `${baseUrl}/${userId}/roles`,
    method: 'PUT',
    data: [
      {
        name: role,
      },
    ],
  });
  return response.data;
};
