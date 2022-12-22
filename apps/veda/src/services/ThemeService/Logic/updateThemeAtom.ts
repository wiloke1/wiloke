import { AdminTheme } from 'types/Theme';
import { RoleException } from 'utils/constants/constants';
import { getUserInfo } from 'utils/functions/getUserInfo';
import { handleGlobalTranslationsInThemeAtom } from '../Adapter/handleGlobalTranslations';
import { themeApis } from '../apis';

interface UpdateThemeAtom {
  theme: Required<
    Pick<
      Parameters<typeof themeApis.atom.adminApi.theme.updateAtom>[0]['theme'],
      | 'commandId'
      | 'addonCommandIds'
      | 'headerSectionCommandIds'
      | 'footerSectionCommandIds'
      | 'themeSettings'
      | 'featuredImage'
      | 'globalJs'
      | 'globalScss'
      | 'vendors'
    >
  >;
}

export const updateThemeAtom = async ({ theme }: UpdateThemeAtom): Promise<AdminTheme> => {
  const { role } = getUserInfo();

  if (role === 'admin') {
    const response = await themeApis.atom.adminApi.theme.updateAtom({
      theme,
    });
    return handleGlobalTranslationsInThemeAtom(response.info);
  }

  throw new RoleException();
};
