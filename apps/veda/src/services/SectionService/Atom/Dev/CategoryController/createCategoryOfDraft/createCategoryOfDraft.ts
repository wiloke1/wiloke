import { AxiosResponse } from 'axios';
import { SectionCategoryTag } from 'types/Sections';
import { GetRequired } from 'utils';
import fetchAPI from 'utils/functions/fetchAPI';
import { baseUrl } from '../const';

interface CreateCategoryOfAtom {
  /** Dữ liệu sẽ apply vào record */
  category: Omit<GetRequired<SectionCategoryTag>, 'commandId'>;
}

interface ResponseSuccess {
  message: string;
  info: SectionCategoryTag;
}

/** API cho phép "Dev" tạo ra "Category" -> Phục vụ cho "Dev và Admin" filter "Section Draft" */
export const createCategoryOfDraft = async ({ category }: CreateCategoryOfAtom) => {
  const response: AxiosResponse<ResponseSuccess> = await fetchAPI.request({
    url: `${baseUrl}`,
    method: 'POST',
    data: category,
  });

  return response.data;
};
