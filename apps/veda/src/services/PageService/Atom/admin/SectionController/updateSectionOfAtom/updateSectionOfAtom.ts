import { AxiosResponse } from 'axios';
import { SectionOfPage_Atom_N_ClientOrTheme_Atom_N_Client } from 'types/Sections';
import { ToRequiredKeys } from 'utils';
import fetchAPI from 'utils/functions/fetchAPI';
import { baseUrl } from '../const';

interface UpdateSectionOfAtom {
  /** Dữ liệu sẽ apply vào record */
  section: ToRequiredKeys<SectionOfPage_Atom_N_ClientOrTheme_Atom_N_Client, 'commandId'>;
}

interface ResponseSuccess {
  info: ToRequiredKeys<SectionOfPage_Atom_N_ClientOrTheme_Atom_N_Client, 'commandId'>;
  message: string;
}

/** API được sử dụng để update section - được clone từ section atom - được sử dụng trong page atom */
export const updateSectionOfAtom = async ({ section }: UpdateSectionOfAtom) => {
  const { commandId } = section;
  const response: AxiosResponse<ResponseSuccess> = await fetchAPI.request({
    url: `${baseUrl}/${commandId}`,
    method: 'PUT',
    data: section,
  });
  return response.data;
};
