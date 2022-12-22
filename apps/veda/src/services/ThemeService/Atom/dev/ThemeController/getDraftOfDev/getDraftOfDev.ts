import { AxiosResponse } from 'axios';
import { BE_ThemeDraft } from 'services/ThemeService/Atom/types';
import fetchAPI from 'utils/functions/fetchAPI';
import { baseUrl } from '../const';

interface GetDraftOfDev {
  /** CommandId của theme draft cần lấy dữ liệu */
  commandId: string;
}

interface ResponseSuccess {
  message: string;
  info: BE_ThemeDraft;
}

/** API được sử dụng để lây về dữ liệu theme draft của "Dev" */
export const getDraftOfDev = async ({ commandId }: GetDraftOfDev) => {
  const response: AxiosResponse<ResponseSuccess> = await fetchAPI.request({
    url: `${baseUrl}/${commandId}`,
  });
  return response.data;
};
