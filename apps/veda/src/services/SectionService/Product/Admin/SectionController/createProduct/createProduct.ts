import { AxiosResponse } from 'axios';
import { ProductSection } from 'types/Sections';
import { ToPartialKeys } from 'utils';
import fetchAPI from 'utils/functions/fetchAPI';
import { baseUrl } from '../const';

interface CreateAtom {
  /** Dữ liệu sẽ được apply vào record */
  section: ToPartialKeys<ProductSection, 'commandId'>;
}

interface ResponseSuccess {
  message: string;
  info: ProductSection;
}

/** API được dùng để "Admin" tạo "Section Product" */
export const createProduct = async ({ section }: CreateAtom) => {
  const response: AxiosResponse<ResponseSuccess> = await fetchAPI.request({
    url: `${baseUrl}`,
    method: 'POST',
    data: section,
  });

  return response.data;
};
