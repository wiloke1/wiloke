import { AxiosResponse } from 'axios';
import fetchAPI from 'utils/functions/fetchAPI';
import { baseUrl } from '../const';

interface DeleteMegaMenuOfAtom {
  /** Dữ liệu sẽ apply vào record */
  commandId: string;
}

interface ResponseSuccess {
  message: string;
}

/** API được sử dụng để delete section cua page atom */
export const deleteDeleteMegaMenuOfAtom = async ({ commandId }: DeleteMegaMenuOfAtom) => {
  const response: AxiosResponse<ResponseSuccess> = await fetchAPI.request({
    url: `${baseUrl}/${commandId}`,
    method: 'DELETE',
  });
  return response.data;
};
