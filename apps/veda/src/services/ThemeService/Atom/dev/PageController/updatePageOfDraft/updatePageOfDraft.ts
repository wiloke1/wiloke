import { AxiosResponse } from 'axios';
import { BE_PageInThemeAtom } from 'services/ThemeService/Atom/types';
import { ToRequiredKeys } from 'utils';
import fetchAPI from 'utils/functions/fetchAPI';
import { baseUrl } from '../const';

interface UpdatePageOfDraft {
  /** Dữ liệu sẽ được apply vào record */
  page: ToRequiredKeys<Partial<BE_PageInThemeAtom>, 'label' | 'pageSettings' | 'sectionCommandIds' | 'type' | 'commandId'>;
}

interface ResponseSuccess {
  message: string;
  info: BE_PageInThemeAtom;
}

/** API được sử dụng để api page thuộc theme atom service */
export const updatePageOfDraft = async ({ page }: UpdatePageOfDraft) => {
  const { commandId } = page;
  const response: AxiosResponse<ResponseSuccess> = await fetchAPI.request({
    url: `${baseUrl}/${commandId}`,
    method: 'PUT',
    data: page,
  });
  return response.data;
};
