import { AxiosResponse } from 'axios';
import { DevAddon } from 'types/Addons';
import fetchAPI from 'utils/functions/fetchAPI';
import { baseUrl } from '../const';

interface CreateDraftOfDev {
  /** Dữ liệu sẽ được apply vào record */
  addon: Omit<DevAddon, 'commandId' | 'parentCommandId'>;
}

interface ResponseSuccess {
  info: DevAddon;
  message: string;
}

/** API được sử dụng để "Dev" tạo "Addon Draft" */
export const createDraftOfDev = async ({ addon }: CreateDraftOfDev) => {
  const response: AxiosResponse<ResponseSuccess> = await fetchAPI.request({
    url: `${baseUrl}`,
    method: 'POST',
    data: addon,
  });
  return response.data;
};
