import { AxiosResponse } from 'axios';
import fetchAPI from 'utils/functions/fetchAPI';
import { baseUrl } from './const';

interface DeleteCategoryOfEnvato {
  /** commandId của category */
  commandId: string;
}

interface ResponseSuccess {
  message: string;
}

export const deleteCategoryOfEnvato = async ({ commandId }: DeleteCategoryOfEnvato) => {
  const response: AxiosResponse<ResponseSuccess> = await fetchAPI.request({
    url: `${baseUrl}/${commandId}`,
    method: 'DELETE',
  });

  return response.data;
};
