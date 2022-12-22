import { AxiosResponse } from 'axios';
import { ProductPage } from 'types/Page';
import fetchAPI from 'utils/functions/fetchAPI';
import { baseUrl } from '../const';

interface CreateCategory {
  /** Dữ liệu được apply vào record */
  category: Omit<Exclude<ProductPage['category'], undefined>, 'commandId'>;
}

interface ResponseSuccess {
  message: string;
  info: Exclude<ProductPage['category'], undefined>;
}

/** API được sử dụng để "Admin" tạo category cho page trên production */
export const createCategory = async ({ category }: CreateCategory) => {
  const response: AxiosResponse<ResponseSuccess> = await fetchAPI.request({
    url: `${baseUrl}`,
    method: 'POST',
    data: category,
  });
  return response.data;
};
