import { AxiosResponse } from 'axios';
import { ProductSection } from 'types/Sections';
import fetchAPI from 'utils/functions/fetchAPI';
import { baseUrl } from '../const';

interface UpdateProduct {
  /** Dữ liệu sẽ apply vào record */
  section: ProductSection;
}

interface ResponseSuccess {
  info: ProductSection;
  message: string;
}

/** API được sử dụng để "Admin" update "Section Product" */
export const updateProduct = async ({ section }: UpdateProduct) => {
  const { commandId } = section;
  const response: AxiosResponse<ResponseSuccess> = await fetchAPI.request({
    method: 'put',
    url: `${baseUrl}/${commandId}`,
    data: section,
  });

  return response.data;
};
