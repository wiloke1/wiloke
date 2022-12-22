import { AxiosResponse } from 'axios';
import { DevSection } from 'types/Sections';
import fetchAPI from 'utils/functions/fetchAPI';
import { baseUrl } from '../const';

interface FilterDraftsOfDev {
  categoryName?: string;
  label?: string;
  sectionStatus?: DevSection['status'];
  categoryCommandId?: string;
}

interface ResponseSuccess {
  info: DevSection[];
  message: string;
}

/** API được sử dụng để filter section draft theo params truyền vào */
export const filterDraftsOfDev = async ({ categoryCommandId, categoryName, label, sectionStatus }: FilterDraftsOfDev) => {
  const response: AxiosResponse<ResponseSuccess> = await fetchAPI.request({
    url: `${baseUrl}/search`,
    params: {
      categoryName: categoryName ? categoryName : undefined,
      label: label ? label : undefined,
      sectionStatus: sectionStatus ? sectionStatus : undefined,
      categoryCommandId: categoryCommandId ? categoryCommandId : undefined,
    },
  });
  return response.data;
};
