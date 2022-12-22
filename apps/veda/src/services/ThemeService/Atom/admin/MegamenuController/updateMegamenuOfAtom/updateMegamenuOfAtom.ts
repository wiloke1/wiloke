import { AxiosResponse } from 'axios';
import { SectionOfPage_Atom_N_ClientOrTheme_Atom_N_Client } from 'types/Sections';
import { ToRequiredKeys } from 'utils';
import fetchAPI from 'utils/functions/fetchAPI';
import { baseUrl } from '../const';

interface UpdateMegamenuOfAtom {
  /** Dữ liệu sẽ được apply vào record */
  megamenu: ToRequiredKeys<SectionOfPage_Atom_N_ClientOrTheme_Atom_N_Client, 'commandId'>;
}

interface ResponseSuccess {
  info: ToRequiredKeys<SectionOfPage_Atom_N_ClientOrTheme_Atom_N_Client, 'commandId'>;
  message: string;
}

/** API được sử dụng để update megamenu - được clone từ megamenu atom - được sử dụng trong theme atom */
export const updateMegamenuOfAtom = async ({ megamenu }: UpdateMegamenuOfAtom) => {
  const { commandId } = megamenu;
  const response: AxiosResponse<ResponseSuccess> = await fetchAPI.request({
    url: `${baseUrl}/${commandId}`,
    method: 'PUT',
    data: megamenu,
  });
  return response.data;
};
