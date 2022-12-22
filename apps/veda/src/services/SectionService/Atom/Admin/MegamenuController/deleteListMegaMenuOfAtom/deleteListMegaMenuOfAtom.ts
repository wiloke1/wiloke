import { AxiosResponse } from 'axios';
import fetchAPI from 'utils/functions/fetchAPI';
import { baseUrl } from '../const';

interface DeleteListMegamenuOfAtom {
  /** list mega menu commandId của atom section  */
  listIds: string[];
}

interface ResponseSuccess {
  message: string;
}

export const deleteListMegaMenuOfAtom = async ({ listIds }: DeleteListMegamenuOfAtom) => {
  const response: AxiosResponse<ResponseSuccess> = await fetchAPI.request({
    url: baseUrl,
    method: 'delete',
    params: {
      listIds,
    },
  });
  return response.data;
};
