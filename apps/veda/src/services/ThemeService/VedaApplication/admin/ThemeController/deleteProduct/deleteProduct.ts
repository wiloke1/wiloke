import { AxiosResponse } from 'axios';
import fetchAPI from 'utils/functions/fetchAPI';
import { baseUrl } from '../const';

interface DeleteProduct {
  /** CommandId của theme product cần xoá */
  commandId: string;
}

interface ResponseSuccess {
  message: string;
}

/** API được sử dụng để "Admin" xoá theme trên bản production */
export const deleteProducts = async ({ commandId }: DeleteProduct) => {
  const response: AxiosResponse<ResponseSuccess> = await fetchAPI.request({
    url: `${baseUrl}/${commandId}`,
    method: 'DELETE',
  });
  return response.data;
};
