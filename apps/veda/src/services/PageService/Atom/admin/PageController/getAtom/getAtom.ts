import { AxiosResponse } from 'axios';
import fetchAPI from 'utils/functions/fetchAPI';
import { baseUrl } from '../const';
import { BE_PageAtom } from '../../../types';

interface GetAtom {
  /** CommandId của page atom cần lấy dữ liệu */
  commandId: string;
}

interface ResponseSuccess {
  message: string;
  info: BE_PageAtom;
}

/** API được sử dụng để lấy về dữ liệu của page atom */
export const getAtom = async ({ commandId }: GetAtom) => {
  const response: AxiosResponse<ResponseSuccess> = await fetchAPI.request({
    url: `${baseUrl}/${commandId}`,
  });
  return response.data;
};
