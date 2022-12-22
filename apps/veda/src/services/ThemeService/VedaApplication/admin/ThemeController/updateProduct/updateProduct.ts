import { AxiosResponse } from 'axios';
import { BE_ThemeProduct } from 'services/ThemeService/VedaApplication/types';
import fetchAPI from 'utils/functions/fetchAPI';
import { baseUrl } from '../const';

interface UpdateProduct {
  /** Dữ liệu được apply vào record */
  theme: BE_ThemeProduct;
}

interface ResponseSuccess {
  message: string;
  info: BE_ThemeProduct;
}

/** API được sử dụng để "Admin" update các meta data của theme trên production */
export const updateProduct = async ({ theme }: UpdateProduct) => {
  const { commandId } = theme;
  const response: AxiosResponse<ResponseSuccess> = await fetchAPI.request({
    url: `${baseUrl}/${commandId}`,
    method: 'PUT',
    data: theme,
  });
  return response.data;
};
