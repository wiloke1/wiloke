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

/** API để "Admin" có thể lấy dữ liệu "Section Draft" của "Devs" -> Phục vụ cho chức năng "Admin" có thể sửa "Section mà Devs đang sửa" */
export const getDraftOfDev = async ({ commandId }: GetDraftOfDev) => {
  const response: AxiosResponse<ResponseSuccess> = await fetchAPI.request({
    url: `${baseUrl}/drafts/${commandId}`,
  });

  return response.data.info;
};
