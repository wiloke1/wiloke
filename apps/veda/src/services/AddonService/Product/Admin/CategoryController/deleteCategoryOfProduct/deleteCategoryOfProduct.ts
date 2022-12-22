import { AxiosResponse } from 'axios';
import fetchAPI from 'utils/functions/fetchAPI';
import { baseUrl } from '../const';

interface DeleteCategoryOfProduct {
  /** commandId của category */
  commandId: string;
}

interface ResponseSuccess {
  message: string;
}

/** API cho phép "Admin" delete "Category" */
export const deleteCategoryOfProduct = async ({ commandId }: DeleteCategoryOfProduct) => {
  const response: AxiosResponse<ResponseSuccess> = await fetchAPI.request({
    url: `${baseUrl}/${commandId}`,
    method: 'DELETE',
  });

  return response.data;
};
