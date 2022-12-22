import { AxiosResponse } from 'axios';
import { SectionCategoryTag } from 'types/Sections';
import { GetRequired } from 'utils';
import fetchAPI from 'utils/functions/fetchAPI';
import { baseUrl } from '../const';

interface CreateCategoryOfProduct {
  /** Dữ liệu sẽ apply vào record */
  category: Omit<GetRequired<SectionCategoryTag>, 'commandId'>;
}

interface ResponseSuccess {
  message: string;
  info: SectionCategoryTag;
}

/** API cho phép "Dev" tạo ra "Category" -> Phục vụ cho "Dev, Admin, User" filter "Section Product" */
export const createCategoryOfProduct = async ({ category }: CreateCategoryOfProduct) => {
  const response: AxiosResponse<ResponseSuccess> = await fetchAPI.request({
    url: `${baseUrl}`,
    method: 'POST',
    data: category,
  });

  return response.data;
};
