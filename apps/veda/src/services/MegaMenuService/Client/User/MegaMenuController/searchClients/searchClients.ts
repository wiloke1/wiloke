import { AxiosResponse } from 'axios';
import { ProductSection } from 'types/Sections';
import fetchAPI from 'utils/functions/fetchAPI';
import { baseUrl } from '../const';

interface GetClient {
  /** List CommandId của section product cần lấy dữ liệu */
  commandIds: string[];
}
interface ResponseSuccess {
  info: ProductSection[];
  message: string;
}

/** API được client sử dụng để lấy dữ liệu của product section */
export const searchClients = async ({ commandIds }: GetClient) => {
  const response: AxiosResponse<ResponseSuccess> = await fetchAPI.request({
    url: `${baseUrl}/search`,
    params: {
      commandIds,
    },
  });

  return response.data;
};
