import { AxiosResponse } from 'axios';
import { BE_ThemeDraft } from 'services/ThemeService/Atom/types';
import fetchAPI from 'utils/functions/fetchAPI';
import { baseUrl } from '../const';

interface CreateDraftOfDev {
  /** Dữ liệu được apply vào record */
  theme: Omit<BE_ThemeDraft, 'commandId' | 'parentCommandId' | 'createdDateTimestamp' | 'modifiedDateTimestamp'>;
}

interface ResponseSuccess {
  message: string;
  info: BE_ThemeDraft;
}

/** API được sử dụng để "Dev" tạo theme draft */
export const createDraftOfDev = async ({ theme }: CreateDraftOfDev) => {
  const response: AxiosResponse<ResponseSuccess> = await fetchAPI.request({
    url: `${baseUrl}`,
    method: 'POST',
    data: theme,
  });
  return response.data;
};
