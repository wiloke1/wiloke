import { AxiosResponse } from 'axios';
import { DevAddon } from 'types/Addons';
import fetchAPI from 'utils/functions/fetchAPI';
import { baseUrl } from '../const';

interface GetDraftOfDev {
  /** CommandId của section draft của dev cần lấy dữ liệu */
  commandId: string;
}

interface ResponseSuccess {
  message: string;
  info: DevAddon;
}

/** API để "Dev" lấy dữ liệu của section draft */
export const getDraftOfDev = async ({ commandId }: GetDraftOfDev) => {
  const response: AxiosResponse<ResponseSuccess> = await fetchAPI.request({
    url: `${baseUrl}/${commandId}`,
  });

  return response.data.info;
};
