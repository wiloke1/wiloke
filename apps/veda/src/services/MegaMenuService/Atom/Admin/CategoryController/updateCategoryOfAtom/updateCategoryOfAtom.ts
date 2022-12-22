import { AxiosResponse } from 'axios';
import { SectionCategoryTag } from 'types/Sections';
import fetchAPI from 'utils/functions/fetchAPI';
import { baseUrl } from '../const';

interface UpdateCategoryOfAtom {
  /** Dữ liệu sẽ apply vào record */
  category: SectionCategoryTag;
}

interface ResponseSuccess {
  message: string;
  info: SectionCategoryTag;
}

/** API cho phép "Admin" update "Category" */
export const updateCategoryOfAtom = async ({ category }: UpdateCategoryOfAtom) => {
  const response: AxiosResponse<ResponseSuccess> = await fetchAPI.request({
    url: `${baseUrl}/${category.commandId}`,
    method: 'PUT',
    data: category,
  });

  return response.data;
};
