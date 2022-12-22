import { AxiosResponse } from 'axios';
import { AddonOfTheme_Atom_N_Client } from 'types/Addons';
import fetchAPI from 'utils/functions/fetchAPI';
import { baseUrl } from '../const';

interface CreateClient {
  /** Dữ liệu sẽ được apply vào record
   * Theo như docs là có commandId, còn thực tế thì cần hỏi sau
   */
  addon: Omit<AddonOfTheme_Atom_N_Client, 'commandId'>;
}

interface ResponseSuccess {
  message: string;
  info: AddonOfTheme_Atom_N_Client;
}

/** API được dùng để client tạo addon */
export const createClient = async ({ addon }: CreateClient) => {
  const response: AxiosResponse<ResponseSuccess> = await fetchAPI.request({
    url: `${baseUrl}`,
    method: 'POST',
    data: addon,
  });

  return response.data;
};
