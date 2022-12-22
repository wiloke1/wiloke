import { AxiosResponse } from 'axios';
import { ProductPage } from 'types/Page';
import fetchAPI from 'utils/functions/fetchAPI';
import { baseUrl } from '../const';

interface GetTags {}

interface ResponseSuccess {
  message: string;
  info: Exclude<ProductPage['tags'], undefined>;
}

/** API được sử dụng để lấy ra các tag đã được tạo */
export const getTags = async ({}: GetTags) => {
  const response: AxiosResponse<ResponseSuccess> = await fetchAPI.request({
    url: `${baseUrl}`,
  });
  return response.data;
};
