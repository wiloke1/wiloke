import { AxiosResponse } from 'axios';
import { BE_ThemeProduct } from 'services/ThemeService/VedaApplication/types';
import fetchAPI from 'utils/functions/fetchAPI';
import { baseUrl } from '../const';

interface GetProduct {
  /** CommandId của theme product cần lấy dữ liệu */
  commandId: string;
}

interface ResponseSuccess {
  message: string;
  info: BE_ThemeProduct;
}

/** API được sử dụng để lấy về dữ liệu của theme product theo id */
export const getProduct = async ({ commandId }: GetProduct) => {
  const response: AxiosResponse<ResponseSuccess> = await fetchAPI.request({
    url: `${baseUrl}/${commandId}`,
  });
  return response.data;
};
