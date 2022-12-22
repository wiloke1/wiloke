import { AxiosResponse } from 'axios';
import { DevAddon } from 'types/Addons';
import fetchAPI from 'utils/functions/fetchAPI';
import { baseUrl } from '../const';

interface UpdateDraftOfDev {
  /** Dữ liệu sẽ apply vào record */
  addon: DevAddon;
}

interface ResponseSuccess {
  message: string;
  info: DevAddon;
}

/** API được sử dụng để update "Section Addon của Dev" */
export const updateDraftOfDev = async ({ addon }: UpdateDraftOfDev) => {
  const { commandId } = addon;
  const response: AxiosResponse<ResponseSuccess> = await fetchAPI.request({
    url: `${baseUrl}/${commandId}`,
    method: 'PUT',
    data: {
      ...addon,
    },
  });
  return response.data;
};
