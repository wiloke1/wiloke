import { AxiosResponse } from 'axios';
import { BE_ThemeAtom } from 'services/ThemeService/Atom/types';
import fetchAPI from 'utils/functions/fetchAPI';
import { baseUrl } from '../const';

interface ApproveDraftToAtom {
  /** CommandId của theme sẽ được approve bởi "Admin" */
  themeDevId: string;
}

interface ResponseSuccess {
  message: string;
  info: BE_ThemeAtom;
}

/** API được sử dụng để "Admin" duyệt theme drafts do "Devs" tạo */
export const approveDraftToAtom = async ({ themeDevId }: ApproveDraftToAtom) => {
  const response: AxiosResponse<ResponseSuccess> = await fetchAPI.request({
    url: `${baseUrl}/approvals/${themeDevId}`,
    method: 'PUT',
  });
  return response.data;
};
