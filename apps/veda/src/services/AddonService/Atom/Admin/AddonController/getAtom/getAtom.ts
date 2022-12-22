import { AxiosResponse } from 'axios';
import { AdminAddon } from 'types/Addons';
import fetchAPI from 'utils/functions/fetchAPI';
import { baseUrl } from '../const';

interface GetAtom {
  /** CommandId của addon atom cần lấy dữ liệu */
  commandId: string;
}
interface ResponseSuccess {
  info: AdminAddon;
  message: string;
}

/** API được sử dụng để lấy dữ liệu của "Section Template" để render ra builder */
export const getAtom = async ({ commandId }: GetAtom) => {
  const response: AxiosResponse<ResponseSuccess> = await fetchAPI.request({
    url: `${baseUrl}/${commandId}`,
  });

  return response.data.info as AdminAddon;
};
