import { AxiosResponse } from 'axios';
import { AdminSection } from 'types/Sections';
import { ToPartialKeys } from 'utils';
import fetchAPI from 'utils/functions/fetchAPI';
import { baseUrl } from '../const';

interface CreateMegamenuOfAtom {
  /** Dữ liệu sẽ apply vào record */
  megamenu: ToPartialKeys<AdminSection, 'commandId'>;
}

interface ResponseSuccess {
  message: string;
  info: AdminSection;
}

/** API được sử dụng để "Admin" khi tạo section có megamenu */
export const createMegamenuOfAtom = async ({ megamenu }: CreateMegamenuOfAtom) => {
  const response: AxiosResponse<ResponseSuccess> = await fetchAPI.request({
    url: `${baseUrl}`,
    method: 'POST',
    data: megamenu,
  });
  return response.data;
};
