import { AxiosResponse } from 'axios';
import { AdminAddon } from 'types/Addons';
import fetchAPI from 'utils/functions/fetchAPI';
import { baseUrl } from '../const';

interface UpdateAtom {
  /** Dữ liệu sẽ apply vào record */
  addon: AdminAddon;
}

interface ResponseSuccess {
  info: AdminAddon;
  message: string;
}

/** API được sử dụng để "Admin" update "Addon Atom" */
export const updateAtom = async ({ addon }: UpdateAtom) => {
  const { commandId } = addon;
  const response: AxiosResponse<ResponseSuccess> = await fetchAPI.request({
    method: 'put',
    url: `${baseUrl}/${commandId}`,
    data: addon,
  });

  return response.data;
};
