import { AxiosResponse } from 'axios';
import { AddonOfTheme_Atom_N_Client } from 'types/Addons';
import { ToRequiredKeys } from 'utils';
import fetchAPI from 'utils/functions/fetchAPI';
import { baseUrl } from '../const';

interface CreateAddonOfAtom {
  /** Dữ liệu được apply vào record */
  addon: Omit<AddonOfTheme_Atom_N_Client, 'commandId'>;
}

interface ResponseSuccess {
  message: string;
  info: ToRequiredKeys<AddonOfTheme_Atom_N_Client, 'commandId'>;
}

/** API được sử dụng để tạo addon - được clone từ addon atom - được sử dụng tại theme atom */
export const createAddonOfAtom = async ({ addon }: CreateAddonOfAtom) => {
  const response: AxiosResponse<ResponseSuccess> = await fetchAPI.request({
    url: `${baseUrl}`,
    method: 'POST',
    data: addon,
  });
  return response.data;
};
