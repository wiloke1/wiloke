import { AxiosResponse } from 'axios';
import { SectionChangelog } from 'types/Sections';
import fetchAPI from 'utils/functions/fetchAPI';
import { baseUrl } from '../const';

interface GetChangelogsOfAtom {
  /** CommandId của section cần lấy tất cả changelog */
  sectionCommandId: string;
}

interface ResponseSuccess {
  info: SectionChangelog[];
  message: string;
}

/** API được sử dụng để lấy về tất cả changelog của 1 section */
export const getChangelogsOfDraft = async ({ sectionCommandId }: GetChangelogsOfAtom) => {
  const response: AxiosResponse<ResponseSuccess> = await fetchAPI.request({
    url: `${baseUrl}/mega-menus/${sectionCommandId}`,
  });

  return response.data;
};
