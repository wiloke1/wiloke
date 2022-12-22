import { AxiosResponse } from 'axios';
import { SectionChangelog } from 'types/Sections';
import fetchAPI from 'utils/functions/fetchAPI';
import { baseUrl } from '../const';

interface GetChangelogsOfAtom {
  /** CommandId của addon cần lấy tất cả changelog */
  addonCommandId: string;
}

interface ResponseSuccess {
  info: SectionChangelog[];
  message: string;
}

/** API được sử dụng để lấy về tất cả changelog của 1 addon */
export const getChangelogsOfDraft = async ({ addonCommandId }: GetChangelogsOfAtom) => {
  const response: AxiosResponse<ResponseSuccess> = await fetchAPI.request({
    url: `${baseUrl}/addons/${addonCommandId}`,
  });

  return response.data;
};
