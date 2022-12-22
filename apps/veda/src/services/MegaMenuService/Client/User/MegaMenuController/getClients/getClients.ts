import { AxiosResponse } from 'axios';
import { ProductSection } from 'types/Sections';
import fetchAPI from 'utils/functions/fetchAPI';
import { baseUrl } from '../const';

interface GetClients {
  /** CommandId của section product cần lấy dữ liệu */
  commandIds: string[];
}
interface ResponseSuccess {
  info: Array<ProductSection | undefined>;
  message: string;
}

/** API được client sử dụng để lấy dữ liệu của product section */
export const getClients = async ({ commandIds }: GetClients) => {
  if (commandIds.length) {
    const response: AxiosResponse<ResponseSuccess> = await fetchAPI.request({
      url: `${baseUrl}/search`,
      params: {
        commandIds: commandIds.join(','),
      },
    });

    return response.data.info;
  }
  return [];
};
