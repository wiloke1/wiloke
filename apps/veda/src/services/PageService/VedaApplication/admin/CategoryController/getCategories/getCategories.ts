import { AxiosResponse } from 'axios';
import { ProductPage } from 'types/Page';
import fetchAPI from 'utils/functions/fetchAPI';
import { baseUrl } from '../const';

interface GetCategories {}

interface ResponseSuccess {
  message: string;
  info: Exclude<ProductPage['category'], undefined>[];
}

/** API được sử dụng để lấy ra các categories đã được tạo */
export const getCategories = async ({}: GetCategories) => {
  const response: AxiosResponse<ResponseSuccess> = await fetchAPI.request({
    url: `${baseUrl}`,
  });
  return response.data;
};
