import { AxiosResponse } from 'axios';
import fetchAPI from 'utils/functions/fetchAPI';
import { baseUrl } from '../const';

interface DeleteCategoryOfDraft {
  /** commandId của category */
  commandId: string;
}

interface ResponseSuccess {
  message: string;
}

/** API cho phép "Dev" delete "Category" */
export const deleteCategoryOfDraft = async ({ commandId }: DeleteCategoryOfDraft) => {
  const response: AxiosResponse<ResponseSuccess> = await fetchAPI.request({
    url: `${baseUrl}/${commandId}`,
    method: 'DELETE',
  });

  return response.data;
};
