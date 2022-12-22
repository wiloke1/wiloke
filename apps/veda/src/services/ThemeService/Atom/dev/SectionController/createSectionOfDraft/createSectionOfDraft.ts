import { AxiosResponse } from 'axios';
import { SectionOfPage_Atom_N_ClientOrTheme_Atom_N_Client } from 'types/Sections';
import { ToRequiredKeys } from 'utils';
import fetchAPI from 'utils/functions/fetchAPI';
import { baseUrl } from '../const';

interface CreateSectionOfDraft {
  /** Dữ liệu sẽ được apply vào record */
  section: Omit<SectionOfPage_Atom_N_ClientOrTheme_Atom_N_Client, 'commandId'>;
}

interface ResponseSuccess {
  message: string;
  info: ToRequiredKeys<SectionOfPage_Atom_N_ClientOrTheme_Atom_N_Client, 'commandId'>;
}

/** API được sử dụng để tạo section - được clone từ section atom - được sử dụng tại theme atom và theme draft */
export const createSectionOfDraft = async ({ section }: CreateSectionOfDraft) => {
  const response: AxiosResponse<ResponseSuccess> = await fetchAPI.request({
    url: `${baseUrl}`,
    method: 'POST',
    data: section,
  });
  return response.data;
};
