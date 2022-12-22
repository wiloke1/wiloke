import { AxiosResponse } from 'axios';
import { SectionEnvatoCategory } from 'types/Sections';
import fetchAPI from 'utils/functions/fetchAPI';
import { baseUrl } from './const';

interface UpdateCategoryParams {
  /** commandId của category */
  commandId: string;
  name: string;
  envatoItemId: string;
  description: string;
}

interface ResponseSuccess {
  info: SectionEnvatoCategory;
  message: string;
}

export const updateCategory = async ({ commandId, description, envatoItemId, name }: UpdateCategoryParams) => {
  const response: AxiosResponse<ResponseSuccess> = await fetchAPI.request({
    url: `${baseUrl}/${commandId}`,
    method: 'PUT',
    data: {
      description,
      envatoItemId,
      name,
    },
  });

  return response.data;
};
