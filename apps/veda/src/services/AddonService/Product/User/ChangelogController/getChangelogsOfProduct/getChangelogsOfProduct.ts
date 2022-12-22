import { AxiosResponse } from 'axios';
import { SectionChangelog } from 'types/Sections';
import fetchAPI from 'utils/functions/fetchAPI';
import { baseUrl } from '../const';

interface GetChangelogsOfProduct {
  /** CommandId của addon cần lấy tất cả changelog */
  addonCommandId: string;
}

interface ResponseSuccess {
  info: SectionChangelog[];
  message: string;
}

/** API được sử dụng để lấy về tất cả changelog của 1 section */
export const getChangelogsOfProduct = async ({ addonCommandId }: GetChangelogsOfProduct) => {
  const response: AxiosResponse<ResponseSuccess> = await fetchAPI.request({
    url: `${baseUrl}/addons/${addonCommandId}`,
  });

  return response.data;
};
