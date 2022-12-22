import { AxiosResponse } from 'axios';
import { ProductSection } from 'types/Sections';
import fetchAPI from 'utils/functions/fetchAPI';
import { baseUrl } from '../const';

interface GetProduct {
  /** CommandId của section product cần lấy dữ liệu */
  commandId: string;
}
interface ResponseSuccess {
  info: ProductSection;
  message: string;
}

/** API được sử dụng để lấy dữ liệu của "Section Template" để render ra builder */
export const getProduct = async ({ commandId }: GetProduct) => {
  const response: AxiosResponse<ResponseSuccess> = await fetchAPI.request({
    url: `${baseUrl}/details/${commandId}`,
  });

  return response.data.info as ProductSection;
};
