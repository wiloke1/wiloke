import { AxiosResponse } from 'axios';
import { ProductTheme } from 'types/Theme';
import fetchAPI from 'utils/functions/fetchAPI';
import { baseUrl } from '../const';

interface CreateCategory {
  /** Dữ liệu được apply vào record */
  category: Omit<Exclude<ProductTheme['category'], undefined>, 'commandId'>;
}

interface ResponseSuccess {
  message: string;
  info: Exclude<ProductTheme['category'], undefined>;
}

/** API được sử dụng để "Admin" tạo category cho theme trên production */
export const createCategory = async ({ category }: CreateCategory) => {
  const response: AxiosResponse<ResponseSuccess> = await fetchAPI.request({
    url: `${baseUrl}`,
    method: 'POST',
    data: category,
  });
  return response.data;
};
