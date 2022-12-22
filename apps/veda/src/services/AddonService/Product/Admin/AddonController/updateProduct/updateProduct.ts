import { AxiosResponse } from 'axios';
import { ProductAddon } from 'types/Addons';
import fetchAPI from 'utils/functions/fetchAPI';
import { baseUrl } from '../const';

interface UpdateProduct {
  /** Dữ liệu sẽ apply vào record */
  addon: ProductAddon;
}

interface ResponseSuccess {
  info: ProductAddon;
  message: string;
}

/** API được sử dụng để "Admin" update "Addon Product" */
export const updateProduct = async ({ addon }: UpdateProduct) => {
  const { commandId } = addon;
  const response: AxiosResponse<ResponseSuccess> = await fetchAPI.request({
    method: 'put',
    url: `${baseUrl}/${commandId}`,
    data: addon,
  });

  return response.data;
};
