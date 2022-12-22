import { AxiosResponse } from 'axios';
import { DevSection } from 'types/Sections';
import fetchAPI from 'utils/functions/fetchAPI';
import { baseUrl } from '../const';

interface GetMegamenuOfDraft {
  /** CommandId của megamenu cần lấy dữ liệu */
  commandId: string;
}

interface ResponseSuccess {
  info: DevSection;
  message: string;
}

/** API được sử dụng để "Dev" update megamenu của section atom */
export const getMegamenuOfDraft = async ({ commandId }: GetMegamenuOfDraft) => {
  const response: AxiosResponse<ResponseSuccess> = await fetchAPI.request({
    url: `${baseUrl}/${commandId}`,
  });
  return response.data.info;
};
