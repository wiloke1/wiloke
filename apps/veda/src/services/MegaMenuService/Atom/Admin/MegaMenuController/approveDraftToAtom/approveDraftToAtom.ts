import { AxiosResponse } from 'axios';
import { AdminSection } from 'types/Sections';
import fetchAPI from 'utils/functions/fetchAPI';
import { baseUrl } from '../const';

interface ApproveDraftToAtom {
  /** CommandId của "Section Draft" được "Admin" duyệt và đẩy lên "Section Atom" */
  commandId: string;
}

interface ResponseSuccess {
  info: AdminSection;
  message: string;
}

/** API được sử dụng để "Admin" duyệt "Section được Devs tạo" */
export const approveDraftToAtom = async ({ commandId }: ApproveDraftToAtom) => {
  const response: AxiosResponse<ResponseSuccess> = await fetchAPI.request({
    method: 'PUT',
    url: `${baseUrl}/approvals/${commandId}`,
  });

  return response.data;
};
