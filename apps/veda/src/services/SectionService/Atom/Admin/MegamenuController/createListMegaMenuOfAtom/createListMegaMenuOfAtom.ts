import { AxiosResponse } from 'axios';
import { AdminSection } from 'types/Sections';
import { ToPartialKeys } from 'utils';
import fetchAPI from 'utils/functions/fetchAPI';
import { baseUrl } from '../const';

interface CreateMegamenuOfAtom {
  /** Dữ liệu sẽ apply vào record */
  listMegaMenu: ToPartialKeys<AdminSection, 'commandId'>[];
}

interface ResponseSuccess {
  message: string;
  info: AdminSection[];
}

/** API được sử dụng để "Admin" khi tạo list megamenu của section */
export const createListMegaMenuOfAtom = async ({ listMegaMenu }: CreateMegamenuOfAtom) => {
  const response: AxiosResponse<ResponseSuccess> = await fetchAPI.request({
    url: `${baseUrl}/list`,
    method: 'POST',
    data: listMegaMenu,
  });
  return response.data;
};
