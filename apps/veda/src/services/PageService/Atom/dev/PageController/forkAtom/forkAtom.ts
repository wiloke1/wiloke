import { AxiosResponse } from 'axios';
import { BE_PageDraft } from 'services/PageService/Atom/types';
import fetchAPI from 'utils/functions/fetchAPI';
import { baseUrl } from '../const';

interface ForkAtom {
  /** CommandId của page atom cần fork về để sửa */
  parentCommandId: string;
}

interface ResponseSuccess {
  message: string;
  info: BE_PageDraft;
}

/** API được sử dụng để "Dev" clone 1 bản page atom về khi có yêu cầu update hoặc fix lỗi */
export const forkAtom = async ({ parentCommandId }: ForkAtom) => {
  const response: AxiosResponse<ResponseSuccess> = await fetchAPI.request({
    url: `${baseUrl}/forks/${parentCommandId}`,
    method: 'PUT',
  });
  return response.data;
};
