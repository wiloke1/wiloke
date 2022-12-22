import { AxiosResponse } from 'axios';
import { AdminSection } from 'types/Sections';
import fetchAPI from 'utils/functions/fetchAPI';
import { baseUrl } from '../const';

interface GetMegamenuOfAtom {
  /** list CommandId của megamenu cần lấy dữ liệu */
  commandIds: string;
}

interface ResponseSuccess {
  info: AdminSection[];
  message: string;
}

/** API được sử dụng để "Admin" update megamenu của section atom */
export const searchMegaMenusOfAtom = async ({ commandIds }: GetMegamenuOfAtom) => {
  const response: AxiosResponse<ResponseSuccess> = await fetchAPI.request({
    url: `${baseUrl}/search`,
    params: {
      commandIds,
    },
  });
  return response.data.info;
};
