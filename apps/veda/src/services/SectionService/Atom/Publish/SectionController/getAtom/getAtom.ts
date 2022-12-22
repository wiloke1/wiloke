import { AxiosResponse } from 'axios';
import { AdminSection } from 'types/Sections';
import fetchAPI from 'utils/functions/fetchAPI';
import { baseUrl } from '../const';

interface GetAtom {
  /** CommandId của section atom cần lấy dữ liệu */
  commandId: string;
}
interface ResponseSuccess {
  info: AdminSection;
  message: string;
}

/** API được sử dụng để lấy dữ liệu của "Section Template" để render ra builder */
export const getAtom = async ({ commandId }: GetAtom) => {
  const response: AxiosResponse<ResponseSuccess> = await fetchAPI.request({
    url: `${baseUrl}/${commandId}`,
  });
  return response;
};
