import { AxiosResponse } from 'axios';
import { AdminAddon } from 'types/Addons';
import { ToRequiredKeys } from 'utils';
import fetchAPI from 'utils/functions/fetchAPI';
import { baseUrl } from '../const';

interface ApproveDraftToAtom {
  /** CommandId của "Addon Draft" được "Admin" duyệt và đẩy lên "Addon Atom" */
  commandId: string;
}

interface ResponseSuccess {
  info: ToRequiredKeys<AdminAddon, 'commandId'>;
  message: string;
}

/** API được sử dụng để "Admin" duyệt "Addon được Devs tạo" */
export const approveDraftToAtom = async ({ commandId }: ApproveDraftToAtom) => {
  const response: AxiosResponse<ResponseSuccess> = await fetchAPI.request({
    method: 'PUT',
    url: `${baseUrl}/approvals/${commandId}`,
  });

  return response.data;
};
