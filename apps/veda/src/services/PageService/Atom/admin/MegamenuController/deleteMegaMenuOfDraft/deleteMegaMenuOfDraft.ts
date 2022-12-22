import { AxiosResponse } from 'axios';
import fetchAPI from 'utils/functions/fetchAPI';
import { baseUrl } from '../const';

interface DeleteMegaMenuOfDraft {
  /** Dữ liệu sẽ apply vào record */
  commandId: string;
}

interface ResponseSuccess {
  message: string;
}

/** API được sử dụng để delete section cua page draft khi role = admin */
export const deleteDeleteMegaMenuOfDraft = async ({ commandId }: DeleteMegaMenuOfDraft) => {
  const response: AxiosResponse<ResponseSuccess> = await fetchAPI.request({
    url: `${baseUrl}/drafts/${commandId}`,
    method: 'DELETE',
  });
  return response.data;
};
