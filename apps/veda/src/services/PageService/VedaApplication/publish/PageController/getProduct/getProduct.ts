import { AxiosResponse } from 'axios';
import { BE_PageProduct } from 'services/PageService/VedaApplication/types';
import fetchAPI from 'utils/functions/fetchAPI';
import { baseUrl } from '../const';

interface GetProduct {
  /** CommandId của page product cần lấy dữ liệu */
  commandId: string;
}

interface ResponseSuccess {
  message: string;
  info: BE_PageProduct;
}

/** API được sử dụng để lấy về dữ liệu của page product theo id */
export const getProduct = async ({ commandId }: GetProduct) => {
  const response: AxiosResponse<ResponseSuccess> = await fetchAPI.request({
    url: `${baseUrl}/${commandId}`,
  });
  return response.data;
};
