import { AxiosResponse } from 'axios';
import { BE_ThemeAtom } from 'services/ThemeService/Atom/types';
import fetchAPI from 'utils/functions/fetchAPI';
import { baseUrl } from '../const';

interface GetAtom {
  /** CommandId của theme cần lấy dữ liệu */
  commandId: string;
}

interface ResponseSuccess {
  message: string;
  info: BE_ThemeAtom;
}

/** API được sử dụng để lấy dữ liệu của theme atom */
export const getAtom = async ({ commandId }: GetAtom) => {
  const response: AxiosResponse<ResponseSuccess> = await fetchAPI.request({
    url: `${baseUrl}/${commandId}`,
  });
  return response.data;
};
