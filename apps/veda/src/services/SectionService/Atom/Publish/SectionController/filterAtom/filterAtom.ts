import { AxiosResponse } from 'axios';
import { AdminSection } from 'types/Sections';
import fetchAPI from 'utils/functions/fetchAPI';
import { baseUrl } from '../const';

interface FilterAtom {
  categoryName?: string;
  label?: string;
  categoryCommandId?: string;
}

interface ResponseSuccess {
  info: AdminSection[];
  message: string;
}

/** API được sử dụng để filter section atom theo params truyền vào */
export const filterAtom = async ({ categoryCommandId, categoryName, label }: FilterAtom) => {
  const response: AxiosResponse<ResponseSuccess> = await fetchAPI.request({
    url: `${baseUrl}/search`,
    params: {
      categoryName: categoryName ? categoryName : undefined,
      label: label ? label : undefined,
      categoryCommandId: categoryCommandId ? categoryCommandId : undefined,
    },
  });
  return response.data;
};
