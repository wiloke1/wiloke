import { AxiosResponse } from 'axios';
import { BE_PageProduct } from 'services/PageService/VedaApplication/types';
import fetchAPI from 'utils/functions/fetchAPI';
import { baseUrl } from '../const';

interface UpdateProduct {
  /** Dữ liệu được apply vào record */
  page: BE_PageProduct;
}

interface ResponseSuccess {
  message: string;
  info: BE_PageProduct;
}

/** API được sử dụng để "Admin" update các meta data của page trên production */
export const updateProduct = async ({ page }: UpdateProduct) => {
  const { commandId } = page;
  const response: AxiosResponse<ResponseSuccess> = await fetchAPI.request({
    url: `${baseUrl}/${commandId}`,
    method: 'PUT',
    data: page,
  });
  return response.data;
};
