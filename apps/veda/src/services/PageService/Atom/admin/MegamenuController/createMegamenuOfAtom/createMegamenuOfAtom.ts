import { AxiosResponse } from 'axios';
import { SectionOfPage_Atom_N_ClientOrTheme_Atom_N_Client } from 'types/Sections';
import { ToRequiredKeys } from 'utils';
import fetchAPI from 'utils/functions/fetchAPI';
import { baseUrl } from '../const';

interface CreateMegamenuOfAtom {
  /** Dữ liệu sẽ được apply vào record */
  megamenu: Omit<SectionOfPage_Atom_N_ClientOrTheme_Atom_N_Client, 'commandId'>;
}

interface ResponseSuccess {
  message: string;
  info: ToRequiredKeys<SectionOfPage_Atom_N_ClientOrTheme_Atom_N_Client, 'commandId'>;
}

/** API được sử dụng để tạo megamenu - được clone từ megamenu atom - được sử dụng tại page atom */
export const createMegamenuOfAtom = async ({ megamenu }: CreateMegamenuOfAtom) => {
  const response: AxiosResponse<ResponseSuccess> = await fetchAPI.request({
    url: `${baseUrl}`,
    method: 'POST',
    data: megamenu,
  });
  return response.data;
};
