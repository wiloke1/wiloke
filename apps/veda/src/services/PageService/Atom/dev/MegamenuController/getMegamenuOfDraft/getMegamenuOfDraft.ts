import { AxiosResponse } from 'axios';
import { SectionOfPage_Atom_N_ClientOrTheme_Atom_N_Client } from 'types/Sections';
import { ToRequiredKeys } from 'utils';
import fetchAPI from 'utils/functions/fetchAPI';
import { baseUrl } from '../const';

interface GetMegamenuOfDraft {
  /** CommandId của megamenu cần lấy dữ liệu */
  commandId: string;
}

interface ResponseSuccess {
  info?: ToRequiredKeys<SectionOfPage_Atom_N_ClientOrTheme_Atom_N_Client, 'commandId'>;
  message: string;
}

/** API được sử dụng để lấy về dữ liệu của megamenu - được clone từ megamenu atom - được sử dụng trong page draft theo commandId */
export const getMegamenuOfDraft = async ({ commandId }: GetMegamenuOfDraft) => {
  const response: AxiosResponse<ResponseSuccess> = await fetchAPI.request({
    url: `${baseUrl}/${commandId}`,
  });
  return response.data;
};
