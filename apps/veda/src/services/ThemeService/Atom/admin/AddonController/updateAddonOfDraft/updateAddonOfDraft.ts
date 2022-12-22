import { AxiosResponse } from 'axios';
import { AddonOfTheme_Atom_N_Client } from 'types/Addons';
import { ToRequiredKeys } from 'utils';
import fetchAPI from 'utils/functions/fetchAPI';
import { baseUrl } from '../const';

interface UpdateAddonOfDraft {
  /** Dữ liệu sẽ được apply vào record */
  addon: ToRequiredKeys<AddonOfTheme_Atom_N_Client, 'commandId'>;
}

interface ResponseSuccess {
  message: string;
  info: ToRequiredKeys<AddonOfTheme_Atom_N_Client, 'commandId'>;
}

/** API được sử dụng để tạo addon - được clone từ addon atom - được sử dụng tại theme draft */
export const updateAddonOfDraft = async ({ addon }: UpdateAddonOfDraft) => {
  const { commandId } = addon;
  const response: AxiosResponse<ResponseSuccess> = await fetchAPI.request({
    url: `${baseUrl}/drafts/${commandId}`,
    method: 'PUT',
    data: addon,
  });
  return response.data;
};
