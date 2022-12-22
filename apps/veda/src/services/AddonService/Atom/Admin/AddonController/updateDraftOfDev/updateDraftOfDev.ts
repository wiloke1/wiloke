import { AxiosResponse } from 'axios';
import { DevAddon } from 'types/Addons';
import { ToRequiredKeys } from 'utils';
import fetchAPI from 'utils/functions/fetchAPI';
import { baseUrl } from '../const';

interface UpdateDraftOfDev {
  /** Dữ liệu sẽ apply vào record */
  addon: DevAddon;
}

interface ResponseSuccess {
  message: string;
  info: ToRequiredKeys<DevAddon, 'commandId'>;
}

/** API được sử dụng đẻ "Admin" update "Addon draft của Devs" */
export const updateDraftOfDev = async ({ addon }: UpdateDraftOfDev) => {
  const { commandId } = addon;
  const response: AxiosResponse<ResponseSuccess> = await fetchAPI.request({
    url: `${baseUrl}/drafts/${commandId}`,
    method: 'PUT',
    data: {
      ...addon,
    },
  });
  return response.data;
};
