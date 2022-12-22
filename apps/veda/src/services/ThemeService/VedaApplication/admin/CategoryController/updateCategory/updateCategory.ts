import { AxiosResponse } from 'axios';
import { ProductTheme } from 'types/Theme';
import fetchAPI from 'utils/functions/fetchAPI';
import { baseUrl } from '../const';

interface UpdateupdateCategory {
  /** Dữ liệu được apply vào record */
  category: Exclude<ProductTheme['category'], undefined>;
}

interface ResponseSuccess {
  message: string;
  category: Exclude<ProductTheme['category'], undefined>;
}

/** API được sử dụng để "Admin" update category của theme trên production */
export const updateupdateCategory = async ({ category }: UpdateupdateCategory) => {
  const { commandId } = category;
  const response: AxiosResponse<ResponseSuccess> = await fetchAPI.request({
    url: `${baseUrl}/${commandId}`,
    method: 'PUT',
    data: category,
  });
  return response.data;
};
