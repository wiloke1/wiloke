import { AxiosResponse } from 'axios';
import { SectionOfPage_Atom_N_ClientOrTheme_Atom_N_Client } from 'types/Sections';
import fetchAPI from 'utils/functions/fetchAPI';
import { baseUrl } from '../const';

interface CreateClient {
  /** Dữ liệu sẽ được apply vào record */
  megamenu: SectionOfPage_Atom_N_ClientOrTheme_Atom_N_Client;
}

interface ResponseSuccess {
  message: string;
  info: SectionOfPage_Atom_N_ClientOrTheme_Atom_N_Client;
}

/** API được dùng để client tạo megamenu */
export const createClient = async ({ megamenu }: CreateClient) => {
  const response: AxiosResponse<ResponseSuccess> = await fetchAPI.request({
    url: `${baseUrl}`,
    method: 'POST',
    data: megamenu,
  });

  return response.data;
};
