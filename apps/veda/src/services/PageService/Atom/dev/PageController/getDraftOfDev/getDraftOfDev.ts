import { AxiosResponse } from 'axios';
import { BE_PageDraft } from 'services/PageService/Atom/types';
import fetchAPI from 'utils/functions/fetchAPI';
import { baseUrl } from '../const';

interface GetDraftOfDev {
  /** CommandId của page draft cần lấy dữ liệu */
  commandId: string;
}

interface ResponseSuccess {
  message: string;
  info: BE_PageDraft;
}

/** API được sử dụng để "Dev" lấy dữ liệu của page draft */
export const getDraftOfDev = async ({ commandId }: GetDraftOfDev) => {
  const response: AxiosResponse<ResponseSuccess> = await fetchAPI.request({
    url: `${baseUrl}/${commandId}`,
  });
  return response.data;
};
