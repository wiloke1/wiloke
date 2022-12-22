import { AxiosResponse } from 'axios';
import { BE_ThemeDraft } from 'services/ThemeService/Atom/types';
import { ToRequiredKeys } from 'utils';
import fetchAPI from 'utils/functions/fetchAPI';
import { baseUrl } from '../const';

interface ForkAtom {
  /** CommandId của theme atom cần fork về để sửa */
  parentCommandId: string;
}

interface ResponseSuccess {
  message: string;
  info: ToRequiredKeys<BE_ThemeDraft, 'parentCommandId'>;
}

/** API được sử dụng để "Dev" clone 1 bản theme atom về khi có yêu cầu update hoặc fix lỗi */
export const forkAtom = async ({ parentCommandId }: ForkAtom) => {
  const response: AxiosResponse<ResponseSuccess> = await fetchAPI.request({
    url: `${baseUrl}/forks/${parentCommandId}`,
    method: 'POST',
  });
  return response.data;
};
