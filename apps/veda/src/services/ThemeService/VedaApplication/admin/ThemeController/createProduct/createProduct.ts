import { AxiosResponse } from 'axios';
import { BE_ThemeProduct } from 'services/ThemeService/VedaApplication/types';
import fetchAPI from 'utils/functions/fetchAPI';
import { baseUrl } from '../const';

interface CreateProduct {
  /** Dữ liệu được apply vào record */
  theme: Omit<BE_ThemeProduct, 'commandId'>;
}

interface ResponseSuccess {
  message: string;
  info: BE_ThemeProduct;
}

/** API được sử dụng để "Admin" tạo bản production cho atom */
export const createProduct = async ({ theme }: CreateProduct) => {
  const response: AxiosResponse<ResponseSuccess> = await fetchAPI.request({
    url: `${baseUrl}`,
    method: 'POST',
    data: theme,
  });
  return response.data;
};
