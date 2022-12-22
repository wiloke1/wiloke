import { AxiosResponse } from 'axios';
import fetchAPI from 'utils/functions/fetchAPI';
import { baseUrl } from '../const';

interface DeleteCategoryOfAtom {
  /** commandId của category */
  commandId: string;
}

interface ResponseSuccess {
  message: string;
}

/** API cho phép "Admin" delete "Category" */
export const deleteCategoryOfAtom = async ({ commandId }: DeleteCategoryOfAtom) => {
  const response: AxiosResponse<ResponseSuccess> = await fetchAPI.request({
    url: `${baseUrl}/${commandId}`,
    method: 'DELETE',
  });

  return response.data;
};
