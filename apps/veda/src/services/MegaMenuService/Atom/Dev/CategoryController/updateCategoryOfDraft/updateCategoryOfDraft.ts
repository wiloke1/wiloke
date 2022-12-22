import { AxiosResponse } from 'axios';
import { SectionCategoryTag } from 'types/Sections';
import fetchAPI from 'utils/functions/fetchAPI';
import { baseUrl } from '../const';

interface UpdateCategoryOfDraft {
  /** Dữ liệu sẽ apply vào record */
  category: SectionCategoryTag;
}

interface ResponseSuccess {
  message: string;
  info: SectionCategoryTag;
}

/** API cho phép "Dev" update "Category" */
export const updateCategoryOfDraft = async ({ category }: UpdateCategoryOfDraft) => {
  const response: AxiosResponse<ResponseSuccess> = await fetchAPI.request({
    url: `${baseUrl}/${category.commandId}`,
    method: 'PUT',
    data: category,
  });

  return response.data;
};
