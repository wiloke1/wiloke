import { AxiosResponse } from 'axios';
import { ProductAddon } from 'types/Addons';
import { ToPartialKeys } from 'utils';
import fetchAPI from 'utils/functions/fetchAPI';
import { baseUrl } from '../const';

interface CreateAtom {
  /** Dữ liệu sẽ được apply vào record */
  addon: ToPartialKeys<ProductAddon, 'commandId'>;
}

interface ResponseSuccess {
  message: string;
  info: ProductAddon;
}

/** API được dùng để "Admin" tạo "Addon Product" */
export const createProduct = async ({ addon }: CreateAtom) => {
  const response: AxiosResponse<ResponseSuccess> = await fetchAPI.request({
    url: `${baseUrl}`,
    method: 'POST',
    data: addon,
  });

  return response.data;
};
