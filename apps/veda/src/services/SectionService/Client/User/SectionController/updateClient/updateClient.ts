import { AxiosResponse } from 'axios';
import { SectionOfPage_Atom_N_ClientOrTheme_Atom_N_Client } from 'types/Sections';
import { ToRequiredKeys } from 'utils';
import fetchAPI from 'utils/functions/fetchAPI';
import { baseUrl } from '../const';

interface UpdateClient {
  /** Dữ liệu sẽ apply vào record */
  section: SectionOfPage_Atom_N_ClientOrTheme_Atom_N_Client;
}

interface ResponseSuccess {
  info: ToRequiredKeys<SectionOfPage_Atom_N_ClientOrTheme_Atom_N_Client, 'commandId'>;
  message: string;
}

/** API được sử dụng để client update section */
export const updateClient = async ({ section }: UpdateClient) => {
  const { commandId } = section;
  const response: AxiosResponse<ResponseSuccess> = await fetchAPI.request({
    method: 'put',
    url: `${baseUrl}/${commandId}`,
    data: section,
  });

  return response.data;
};
