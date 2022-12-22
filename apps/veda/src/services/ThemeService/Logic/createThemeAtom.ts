import { ThemeSettings, Theme } from 'types/Result';
import { AdminTheme } from 'types/Theme';
import { RoleException } from 'utils/constants/constants';
import { getUserInfo } from 'utils/functions/getUserInfo';
import { handleGlobalTranslationsInThemeAtom } from '../Adapter/handleGlobalTranslations';
import { themeApis } from '../apis';

interface CreateThemeAtom {
  themeSettings: ThemeSettings;
  pageCommandIds: string[];
  label: string;
  featuredImage: string;
  globalJs: Theme['globalJs'];
  globalScss: Theme['globalScss'];
  vendors: Theme['vendors'];
}

export const createThemeAtom = async ({
  label,
  pageCommandIds,
  featuredImage,
  themeSettings,
  globalJs,
  globalScss,
  vendors,
}: CreateThemeAtom): Promise<AdminTheme> => {
  const { role, id } = getUserInfo();
  if (role === 'admin') {
    const response = await themeApis.atom.adminApi.theme.createAtom({
      theme: {
        label,
        addonCommandIds: [],
        footerSectionCommandIds: [],
        headerSectionCommandIds: [],
        pageCommandIds,
        featuredImage,
        themeSettings,
        globalJs,
        globalScss,
        vendors,
        userId: id,
      },
    });
    return handleGlobalTranslationsInThemeAtom(response.info);
  }
  throw new RoleException();
};
