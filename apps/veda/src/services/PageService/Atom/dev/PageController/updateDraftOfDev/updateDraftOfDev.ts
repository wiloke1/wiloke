import { AxiosResponse } from 'axios';
import { BE_PageDraft } from 'services/PageService/Atom/types';
import { ToRequiredKeys } from 'utils';
import fetchAPI from 'utils/functions/fetchAPI';
import { baseUrl } from '../const';

interface UpdateDraftOfDev {
  /** Dữ liệu sẽ apply vào record */
  page: ToRequiredKeys<Partial<BE_PageDraft>, 'image' | 'label' | 'pageSettings' | 'sectionCommandIds' | 'type' | 'commandId'>;
}

interface ResponseSuccess {
  message: string;
  info: BE_PageDraft;
}

/** API được sử dụng để "Dev" update page draft */
export const updateDraftOfDev = async ({ page }: UpdateDraftOfDev) => {
  const { commandId } = page;
  const response: AxiosResponse<ResponseSuccess> = await fetchAPI.request({
    url: `${baseUrl}/${commandId}`,
    method: 'PUT',
    data: page,
  });
  return response.data;
};
