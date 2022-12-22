import { AxiosResponse } from 'axios';
import { DevSection } from 'types/Sections';
import fetchAPI from 'utils/functions/fetchAPI';
import { baseUrl } from '../const';

interface GetMegamenuOfDraft {
  /** list CommandId của megamenu cần lấy dữ liệu */
  commandIds: string;
}

interface ResponseSuccess {
  info: DevSection[];
  message: string;
}

/** API được sử dụng để "Dev" update megamenu của section draft */
export const searchMegaMenusOfDraft = async ({ commandIds }: GetMegamenuOfDraft) => {
  const response: AxiosResponse<ResponseSuccess> = await fetchAPI.request({
    url: `${baseUrl}/search`,
    params: {
      commandIds,
    },
  });
  return response.data.info;
};
