import { AxiosResponse } from 'axios';
import { SectionChangelog } from 'types/Sections';
import fetchAPI from 'utils/functions/fetchAPI';
import { baseUrl } from '../const';

interface GetChangelog {
  /** CommandId của changelog cần lấy dữ liệu */
  commandId: string;
}

interface ResponseSuccess {
  info: SectionChangelog;
  message: string;
}

/** API được sử dụng để lấy về dữ liệu của 1 changelog theo id */
export const getChangelog = async ({ commandId }: GetChangelog) => {
  const response: AxiosResponse<ResponseSuccess> = await fetchAPI.request({
    url: `${baseUrl}/${commandId}`,
  });
  return response.data;
};
