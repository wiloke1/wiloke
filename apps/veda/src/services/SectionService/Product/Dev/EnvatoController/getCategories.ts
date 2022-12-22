import { AxiosResponse } from 'axios';
import { SectionEnvatoCategory } from 'types/Sections';
import fetchAPI from 'utils/functions/fetchAPI';
import { baseUrl } from './const';

interface ResponseSuccess {
  message: string;
  info: SectionEnvatoCategory[];
}

export const getCategories = async () => {
  const response: AxiosResponse<ResponseSuccess> = await fetchAPI.request({
    url: `${baseUrl}`,
  });
  return response.data;
};
