import { AxiosResponse } from 'axios';
import { AddonOfTheme_Atom_N_Client } from 'types/Addons';
import fetchAPI from 'utils/functions/fetchAPI';
import { baseUrl } from '../const';

interface UpdateClient {
  /** Dữ liệu sẽ apply vào record */
  addon: AddonOfTheme_Atom_N_Client;
}

interface ResponseSuccess {
  info: AddonOfTheme_Atom_N_Client;
  message: string;
}

/** API cho user update client addon */
export const updateClient = async ({ addon }: UpdateClient) => {
  const { commandId } = addon;
  const response: AxiosResponse<ResponseSuccess> = await fetchAPI.request({
    method: 'put',
    url: `${baseUrl}/${commandId}`,
    data: addon,
  });

  return response.data;
};
