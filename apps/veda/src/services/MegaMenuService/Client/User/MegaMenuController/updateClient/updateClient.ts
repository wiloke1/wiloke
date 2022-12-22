import { AxiosResponse } from 'axios';
import { SectionOfPage_Atom_N_ClientOrTheme_Atom_N_Client } from 'types/Sections';
import fetchAPI from 'utils/functions/fetchAPI';
import { baseUrl } from '../const';

interface UpdateClient {
  /** Dữ liệu sẽ apply vào record */
  megamenu: SectionOfPage_Atom_N_ClientOrTheme_Atom_N_Client;
}

interface ResponseSuccess {
  info: SectionOfPage_Atom_N_ClientOrTheme_Atom_N_Client;
  message: string;
}

/** API được sử dụng để client update section */
export const updateClient = async ({ megamenu }: UpdateClient) => {
  const { commandId } = megamenu;
  const response: AxiosResponse<ResponseSuccess> = await fetchAPI.request({
    method: 'put',
    url: `${baseUrl}/${commandId}`,
    data: megamenu,
  });

  return response.data;
};
