import { AxiosResponse } from 'axios';
import { SectionOfPage_Atom_N_ClientOrTheme_Atom_N_Client } from 'types/Sections';
import { ToRequiredKeys } from 'utils';
import fetchAPI from 'utils/functions/fetchAPI';
import { baseUrl } from '../const';

interface GetMegamenusOfAtom {
  /** CommandId của megamenu cần lấy dữ liệu */
  commandIds: string[];
}

interface ResponseSuccess {
  info: Array<ToRequiredKeys<SectionOfPage_Atom_N_ClientOrTheme_Atom_N_Client, 'commandId'> | undefined>;
  message: string;
}

/** API được sử dụng để lấy về dữ liệu của megamenu - được clone từ megamenu atom - được sử dụng trong page atom theo commandId */
export const getMegamenusOfAtom = async ({ commandIds }: GetMegamenusOfAtom) => {
  if (commandIds.length) {
    const response: AxiosResponse<ResponseSuccess> = await fetchAPI.request({
      url: `${baseUrl}/search`,
      params: {
        commandIds: commandIds.join(','),
      },
    });
    return response.data.info;
  }
  return [];
};
