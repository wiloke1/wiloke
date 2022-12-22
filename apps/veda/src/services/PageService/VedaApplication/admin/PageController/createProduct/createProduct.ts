import { AxiosResponse } from 'axios';
import { BE_PageProduct } from 'services/PageService/VedaApplication/types';
import fetchAPI from 'utils/functions/fetchAPI';
import { baseUrl } from '../const';

interface CreateProduct {
  /** Dữ liệu được apply vào record */
  page: Pick<BE_PageProduct, 'category' | 'downloadedCount' | 'image' | 'label' | 'parentCommandId' | 'plan' | 'type'>;
}

interface ResponseSuccess {
  message: string;
  info: BE_PageProduct;
}

/** API được sử dụng để "Admin" tạo bản production cho atom */
export const createProduct = async ({ page }: CreateProduct) => {
  const response: AxiosResponse<ResponseSuccess> = await fetchAPI.request({
    url: `${baseUrl}`,
    method: 'POST',
    data: page,
  });
  return response.data;
};
