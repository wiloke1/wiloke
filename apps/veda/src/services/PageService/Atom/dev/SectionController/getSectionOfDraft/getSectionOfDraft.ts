import { AxiosResponse } from 'axios';
import { SectionOfPage_Atom_N_ClientOrTheme_Atom_N_Client } from 'types/Sections';
import { ToRequiredKeys } from 'utils';
import fetchAPI from 'utils/functions/fetchAPI';
import { baseUrl } from '../const';

interface GetSectionOfDraft {
  /** CommandId của section cần lấy dữ liệu */
  commandId: string;
}

interface ResponseSuccess {
  info?: ToRequiredKeys<SectionOfPage_Atom_N_ClientOrTheme_Atom_N_Client, 'commandId'>;
  message: string;
}

/** API được sử dụng để lấy về dữ liệu của section - được clone từ section atom - được sử dụng trong page draft theo commandId */
export const getSectionOfDraft = async ({ commandId }: GetSectionOfDraft) => {
  const response: AxiosResponse<ResponseSuccess> = await fetchAPI.request({
    url: `${baseUrl}/${commandId}`,
  });
  return response.data;
};
