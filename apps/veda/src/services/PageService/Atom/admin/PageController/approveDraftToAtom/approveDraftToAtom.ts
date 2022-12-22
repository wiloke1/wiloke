import { AxiosResponse } from 'axios';
import fetchAPI from 'utils/functions/fetchAPI';
import { baseUrl } from '../const';
import { BE_PageAtom } from '../../../types';

interface ApproveDraftToAtom {
  /** CommandId của page dev được duyệt bởi "Admin" */
  devCommandId: string;
}

interface ResponseSuccess {
  message: string;
  info: BE_PageAtom;
}

/** API được sử dụng để "Admin" duyệt page do "Devs" tạo ra */
export const approveDraftToAtom = async ({ devCommandId }: ApproveDraftToAtom) => {
  const response: AxiosResponse<ResponseSuccess> = await fetchAPI.request({
    url: `${baseUrl}/approvals/${devCommandId}`,
    method: 'PUT',
  });
  return response.data;
};
