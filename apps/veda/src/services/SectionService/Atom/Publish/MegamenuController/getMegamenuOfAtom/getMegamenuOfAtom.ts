import { AxiosResponse } from 'axios';
import { AdminSection } from 'types/Sections';
import fetchAPI from 'utils/functions/fetchAPI';
import { baseUrl } from '../const';

interface GetMegamenuOfAtom {
  /** CommandId của megamenu cần lấy dữ liệu */
  commandId: string;
}

interface ResponseSuccess {
  info: AdminSection;
  message: string;
}

/** API được sử dụng để "Admin" update megamenu của section atom */
export const getMegamenuOfAtom = async ({ commandId }: GetMegamenuOfAtom) => {
  const response: AxiosResponse<ResponseSuccess> = await fetchAPI.request({
    url: `${baseUrl}/${commandId}`,
  });
  return response.data.info;
};
