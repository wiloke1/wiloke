import { AxiosResponse } from 'axios';
import { ProductPage } from 'types/Page';
import fetchAPI from 'utils/functions/fetchAPI';
import { baseUrl } from '../const';

interface UpdateupdateCategory {
  /** Dữ liệu được apply vào record */
  category: Exclude<ProductPage['category'], undefined>;
}

interface ResponseSuccess {
  message: string;
  category: Exclude<ProductPage['category'], undefined>;
}

/** API được sử dụng để "Admin" update category của page trên production */
export const updateupdateCategory = async ({ category }: UpdateupdateCategory) => {
  const { commandId } = category;
  const response: AxiosResponse<ResponseSuccess> = await fetchAPI.request({
    url: `${baseUrl}/${commandId}`,
    method: 'PUT',
    data: category,
  });
  return response.data;
};
