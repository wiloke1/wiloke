import { AxiosResponse } from 'axios';
import { ProductPage } from 'types/Page';
import fetchAPI from 'utils/functions/fetchAPI';
import { baseUrl } from '../const';

interface GetTag {
  /** CommandId của tag cần lấy dữ liệu */
  commandId: string;
}

interface ResponseSuccess {
  message: string;
  info: Exclude<ProductPage['tags'], undefined>[number];
}

/** API được sử dụng để lấy dữ liệu của tag theo id */
export const getTag = async ({ commandId }: GetTag) => {
  const response: AxiosResponse<ResponseSuccess> = await fetchAPI.request({
    url: `${baseUrl}/${commandId}`,
  });
  return response.data;
};
