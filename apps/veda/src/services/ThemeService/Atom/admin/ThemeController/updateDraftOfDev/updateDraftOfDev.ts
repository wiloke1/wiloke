import { AxiosResponse } from 'axios';
import { BE_ThemeDraft } from 'services/ThemeService/Atom/types';
import { ToRequiredKeys } from 'utils';
import fetchAPI from 'utils/functions/fetchAPI';
import { baseUrl } from '../const';

interface UpdateDraftOfDev {
  /** Dữ liệu sẽ apply vào record */
  theme: Pick<
    ToRequiredKeys<Partial<BE_ThemeDraft>, 'commandId'>,
    | 'commandId'
    | 'addonCommandIds'
    | 'headerSectionCommandIds'
    | 'footerSectionCommandIds'
    | 'themeSettings'
    | 'featuredImage'
    | 'globalJs'
    | 'globalScss'
    | 'vendors'
    | 'pageCommandIds'
    | 'label'
    | 'status'
  >;
}

interface ResponseSuccess {
  message: string;
  info: BE_ThemeDraft;
}

/** API được sử dụng để "Admin" có thể sửa theme draft của "Dev" */
export const updateDraftOfDev = async ({ theme }: UpdateDraftOfDev) => {
  const { commandId } = theme;
  const response: AxiosResponse<ResponseSuccess> = await fetchAPI.request({
    url: `${baseUrl}/drafts/${commandId}`,
    method: 'PUT',
    data: theme,
  });
  return response.data;
};
