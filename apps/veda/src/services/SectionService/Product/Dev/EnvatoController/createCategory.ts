import { AxiosResponse } from 'axios';
import { SectionEnvatoCategory } from 'types/Sections';
import fetchAPI from 'utils/functions/fetchAPI';
import { baseUrl } from './const';

interface CreateCategoryParams {
  /** commandId của category */
  name: string;
  description: string;
  envatoItemId: string;
}

interface ResponseSuccess {
  info: SectionEnvatoCategory;
  message: string;
}

export const createCategory = async ({ description, name, envatoItemId }: CreateCategoryParams) => {
  const response: AxiosResponse<ResponseSuccess> = await fetchAPI.request({
    url: `${baseUrl}`,
    method: 'POST',
    data: {
      description,
      name,
      envatoItemId,
    },
  });

  return response.data;
};
