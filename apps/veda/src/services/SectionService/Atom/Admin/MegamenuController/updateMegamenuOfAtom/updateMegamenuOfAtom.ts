import { AxiosResponse } from 'axios';
import { AdminSection } from 'types/Sections';
import fetchAPI from 'utils/functions/fetchAPI';
import { baseUrl } from '../const';

interface UpdateMegamenuOfAtom {
  /** Dữ liệu sẽ apply vào record */
  megamenu: AdminSection;
}

interface ResponseSuccess {
  message: string;
  info: AdminSection;
}

/** API được sử dụng để "Admin" update megamenu của section atom */
export const updateMegamenuOfAtom = async ({ megamenu }: UpdateMegamenuOfAtom) => {
  const { commandId } = megamenu;
  const response: AxiosResponse<ResponseSuccess> = await fetchAPI.request({
    url: `${baseUrl}/${commandId}`,
    method: 'PUT',
    data: megamenu,
  });

  return response.data;
};
