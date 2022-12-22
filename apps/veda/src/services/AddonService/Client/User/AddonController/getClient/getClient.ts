import { AxiosResponse } from 'axios';
import { ProductAddon } from 'types/Addons';
import { ToRequiredKeys } from 'utils';
import fetchAPI from 'utils/functions/fetchAPI';
import { baseUrl } from '../const';

interface GetClient {
  /** CommandId của addon product cần lấy dữ liệu */
  commandId: string;
}
interface ResponseSuccess {
  info?: ToRequiredKeys<ProductAddon, 'commandId'>;
  message: string;
}

/** API được sử dụng để lấy dữ liệu của product addon */
export const getClient = async ({ commandId }: GetClient) => {
  const response: AxiosResponse<ResponseSuccess> = await fetchAPI.request({
    url: `${baseUrl}/${commandId}`,
  });

  return response.data.info;
};
