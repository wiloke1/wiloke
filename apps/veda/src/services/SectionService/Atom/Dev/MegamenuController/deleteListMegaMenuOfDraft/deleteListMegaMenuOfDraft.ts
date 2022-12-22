import { AxiosResponse } from 'axios';
import fetchAPI from 'utils/functions/fetchAPI';
import { baseUrl } from '../const';

interface DeleteListMegamenuOfDraft {
  /** list mega menu commandId của draft section  */
  listIds: string[];
}

interface ResponseSuccess {
  message: string;
}

export const deleteListMegaMenuOfDraft = async ({ listIds }: DeleteListMegamenuOfDraft) => {
  const response: AxiosResponse<ResponseSuccess> = await fetchAPI.request({
    url: baseUrl,
    method: 'delete',
    params: {
      listIds,
    },
  });
  return response.data;
};
