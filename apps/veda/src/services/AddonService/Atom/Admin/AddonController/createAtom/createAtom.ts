import { AxiosResponse } from 'axios';
import { AdminAddon } from 'types/Addons';
import fetchAPI from 'utils/functions/fetchAPI';
import { baseUrl } from '../const';

interface CreateAtom {
  /** Dữ liệu sẽ được apply vào record */
  addon: Omit<AdminAddon, 'commandId'>;
}

interface ResponseSuccess {
  message: string;
  info: AdminAddon;
}

/** API được dùng để "Admin" tạo "Section Atom" */
export const createAtom = async ({ addon }: CreateAtom) => {
  const response: AxiosResponse<ResponseSuccess> = await fetchAPI.request({
    url: `${baseUrl}`,
    method: 'POST',
    data: addon,
  });

  return response.data;
};
