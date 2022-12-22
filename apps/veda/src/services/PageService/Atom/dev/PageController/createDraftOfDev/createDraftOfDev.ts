import { AxiosResponse } from 'axios';
import { BE_PageDraft } from 'services/PageService/Atom/types';
import { ToRequiredKeys } from 'utils';
import fetchAPI from 'utils/functions/fetchAPI';
import { baseUrl } from '../const';

interface CreateDraftOfDev {
  /** Dữ liệu được apply vào record */
  page: ToRequiredKeys<Partial<Omit<BE_PageDraft, 'commandId'>>, 'image' | 'label' | 'pageSettings' | 'sectionCommandIds' | 'type'>;
}

interface ResponseSuccess {
  message: string;
  info: BE_PageDraft;
}

/** API được sử dụng để "Dev" tạo page draft */
export const createDraftOfDev = async ({ page }: CreateDraftOfDev) => {
  const response: AxiosResponse<ResponseSuccess> = await fetchAPI.request({
    url: `${baseUrl}`,
    method: 'POST',
    data: page,
  });
  return response.data;
};
