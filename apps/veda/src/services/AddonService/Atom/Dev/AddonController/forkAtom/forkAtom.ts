import { AxiosResponse } from 'axios';
import { AdminAddon } from 'types/Addons';
import { ToRequiredKeys } from 'utils';
import fetchAPI from 'utils/functions/fetchAPI';
import { baseUrl } from '../const';

interface ForkAtom {
  parentCommandId: string;
}

interface ResponseSuccess {
  info: ToRequiredKeys<AdminAddon, 'commandId'>;
  message: string;
}

export const forkAtom = async ({ parentCommandId }: ForkAtom) => {
  const response: AxiosResponse<ResponseSuccess> = await fetchAPI.request({
    url: `${baseUrl}/forks/${parentCommandId}`,
    method: 'POST',
  });
  return response.data;
};
