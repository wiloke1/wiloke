import { AxiosResponse } from 'axios';
import { ToRequiredKeys } from 'utils';
import fetchAPI from 'utils/functions/fetchAPI';
import { baseUrl } from '../const';
import { BE_PageDraft } from '../../../types';

interface UpdateDraftOfDev {
  /** Dữ liệu sẽ được apply vào record */
  page: ToRequiredKeys<Partial<BE_PageDraft>, 'image' | 'label' | 'pageSettings' | 'sectionCommandIds' | 'type' | 'commandId'>;
}

interface ResponseSuccess {
  message: string;
  info: BE_PageDraft;
}

/** API được sử dụng đẻ "Admin" update page draft của "Devs" */
export const updateDraftOfDev = async ({ page }: UpdateDraftOfDev) => {
  const { commandId } = page;
  const response: AxiosResponse<ResponseSuccess> = await fetchAPI.request({
    url: `${baseUrl}/drafts/${commandId}`,
    method: 'PUT',
    data: page,
  });
  return response.data;
};
