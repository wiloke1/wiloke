import { AxiosResponse } from 'axios';
import { ProductAddon } from 'types/Addons';
import { ToRequiredKeys } from 'utils';
import fetchAPI from 'utils/functions/fetchAPI';
import { baseUrl } from '../const';

interface GetProduct {
  /** CommandId của section product cần lấy dữ liệu */
  commandId: string;
}
interface ResponseSuccess {
  info: ToRequiredKeys<ProductAddon, 'commandId'>;
  message: string;
}

/** API được sử dụng để lấy dữ liệu của "Addon Template" để render ra builder */
export const getProduct = async ({ commandId }: GetProduct) => {
  const response: AxiosResponse<ResponseSuccess> = await fetchAPI.request({
    url: `${baseUrl}/details/${commandId}`,
  });

  return response.data;
};
