import { AxiosResponse } from 'axios';
import { SectionChangelog } from 'types/Sections';
import fetchAPI from 'utils/functions/fetchAPI';
import { baseUrl } from '../const';

interface GetListChangelogsOfDrafts {
  /** CommandId của section cần lấy tất cả changelog */
  sectionCommandIds: string;
}

interface ResponseSuccess {
  info: SectionChangelog[];
  message: string;
}

/** API được sử dụng để lấy về tất cả changelog của sections */
export const getListChangelogsOfDrafts = async ({ sectionCommandIds }: GetListChangelogsOfDrafts) => {
  const response: AxiosResponse<ResponseSuccess> = await fetchAPI.request({
    url: `${baseUrl}/search`,
    params: {
      versionIds: sectionCommandIds,
    },
  });

  return response.data;
};
