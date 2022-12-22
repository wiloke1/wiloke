import { AxiosResponse } from 'axios';
import { SectionOfPage_Atom_N_ClientOrTheme_Atom_N_Client } from 'types/Sections';
import { ToRequiredKeys } from 'utils';
import fetchAPI from 'utils/functions/fetchAPI';
import { baseUrl } from '../const';

interface CreateClient {
  /** Dữ liệu sẽ được apply vào record */
  section: SectionOfPage_Atom_N_ClientOrTheme_Atom_N_Client;
}

interface ResponseSuccess {
  message: string;
  info: ToRequiredKeys<SectionOfPage_Atom_N_ClientOrTheme_Atom_N_Client, 'commandId'>;
}

/** API được dùng để client tạo section */
export const createClient = async ({ section }: CreateClient) => {
  const response: AxiosResponse<ResponseSuccess> = await fetchAPI.request({
    url: `${baseUrl}`,
    method: 'POST',
    data: section,
  });

  return response.data;
};
