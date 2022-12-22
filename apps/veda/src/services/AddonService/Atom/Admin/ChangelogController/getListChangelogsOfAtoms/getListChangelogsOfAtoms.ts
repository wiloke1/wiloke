import { AxiosResponse } from 'axios';
import { SectionChangelog } from 'types/Sections';
import fetchAPI from 'utils/functions/fetchAPI';
import { baseUrl } from '../const';

interface GetListChangelogsOfAtoms {
  /** CommandId của section cần lấy tất cả changelog */
  addonCommandIds: string;
}

interface ResponseSuccess {
  info: SectionChangelog[];
  message: string;
}

/** API được sử dụng để lấy về tất cả changelog của addons */
export const getListChangelogsOfAtoms = async ({ addonCommandIds }: GetListChangelogsOfAtoms) => {
  const response: AxiosResponse<ResponseSuccess> = await fetchAPI.request({
    url: `${baseUrl}/search`,
    params: {
      versionIds: addonCommandIds,
    },
  });

  return response.data;
};
