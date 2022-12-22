import { AxiosResponse } from 'axios';
import { DevSection } from 'types/Sections';
import fetchAPI from 'utils/functions/fetchAPI';
import { baseUrl } from '../const';

interface GetDraftOfDev {
  /** CommandId của section draft của dev cần lấy dữ liệu */
  commandId: string;
}

interface ResponseSuccess {
  message: string;
  info: DevSection;
}

/** API để "Dev" lấy dữ liệu của section draft */
export const getDraftOfDev = async ({ commandId }: GetDraftOfDev) => {
  const response: AxiosResponse<ResponseSuccess> = await fetchAPI.request({
    url: `${baseUrl}/${commandId}`,
  });

  return response.data.info;
};
