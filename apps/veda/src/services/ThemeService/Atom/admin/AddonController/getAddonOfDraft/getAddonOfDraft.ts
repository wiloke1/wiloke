import { AxiosResponse } from 'axios';
import { AddonOfTheme_Atom_N_Client } from 'types/Addons';
import { ToRequiredKeys } from 'utils';
import fetchAPI from 'utils/functions/fetchAPI';
import { baseUrl } from '../const';

interface GetAddonOfDraft {
  /** CommandId của addon cần lấy dữ liệu */
  commandId: string;
}

interface ResponseSuccess {
  message: string;
  info?: ToRequiredKeys<AddonOfTheme_Atom_N_Client, 'commandId'>;
}

/** API được sử dụng để lấy về dữ liệu của addon - được clone từ addon atom - được sử dụng trong theme draft theo commandId */
export const getAddonOfDraft = async ({ commandId }: GetAddonOfDraft) => {
  const response: AxiosResponse<ResponseSuccess> = await fetchAPI.request({
    url: `${baseUrl}/drafts/${commandId}`,
  });
  return response.data;
};
