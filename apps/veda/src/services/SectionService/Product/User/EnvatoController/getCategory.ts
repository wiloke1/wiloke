import { AxiosResponse } from 'axios';
import { SectionEnvatoCategory } from 'types/Sections';
import fetchAPI from 'utils/functions/fetchAPI';
import { baseUrl } from './const';

interface GetCategoryParams {
  /** commandId của category */
  commandId: string;
}

interface ResponseSuccess {
  info: SectionEnvatoCategory;
  message: string;
}

export const getCategory = async ({ commandId }: GetCategoryParams) => {
  const response: AxiosResponse<ResponseSuccess> = await fetchAPI.request({
    url: `${baseUrl}/${commandId}`,
    method: 'GET',
  });

  return response.data;
};
