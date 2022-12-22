import { AxiosResponse } from 'axios';
import fetchAPI from 'utils/functions/fetchAPI';
import { clientBaseUrl } from '../const';

interface ImportThemeAtom {
  themeAtomCommandId: string;
  eventType: string;
  eventId: string;
}

interface ResponseSuccess {
  message: string;
}

export const importThemeAtom = async ({ themeAtomCommandId, eventId, eventType }: ImportThemeAtom) => {
  const response: AxiosResponse<ResponseSuccess> = await fetchAPI.request({
    url: `${clientBaseUrl}/imports/${themeAtomCommandId}`,
    method: 'PUT',
    params: {
      eventId,
      eventType,
      themeAtomCommandId,
    },
  });
  return response.data;
};
