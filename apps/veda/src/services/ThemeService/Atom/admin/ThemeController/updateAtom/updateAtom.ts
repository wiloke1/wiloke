import { AxiosResponse } from 'axios';
import { BE_ThemeAtom } from 'services/ThemeService/Atom/types';
import { ToRequiredKeys } from 'utils';
import fetchAPI from 'utils/functions/fetchAPI';
import { baseUrl } from '../const';

interface UpdateAtom {
  /** Dữ liệu sẽ được apply vào record */
  theme: Pick<
    ToRequiredKeys<Partial<BE_ThemeAtom>, 'commandId'>,
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
  >;
}

interface ResponseSuccess {
  message: string;
  info: BE_ThemeAtom;
}

/** API được sử dụng để "Admin" update theme atom */
export const updateAtom = async ({ theme }: UpdateAtom) => {
  const { commandId } = theme;
  const response: AxiosResponse<ResponseSuccess> = await fetchAPI.request({
    url: `${baseUrl}/${commandId}`,
    method: 'PUT',
    data: theme,
  });
  return response.data;
};
