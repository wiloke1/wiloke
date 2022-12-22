import { ThemeSettings, Theme } from 'types/Result';
import { DevTheme } from 'types/Theme';
import { RoleException } from 'utils/constants/constants';
import { getUserInfo } from 'utils/functions/getUserInfo';
import { handleGlobalTranslationsInThemeDraft } from '../Adapter/handleGlobalTranslations';
import { themeApis } from '../apis';

interface CreateThemeDraft {
  themeSettings: ThemeSettings;
  pageCommandIds: string[];
  label: string;
  featuredImage: string;
  globalJs: Theme['globalJs'];
  globalScss: Theme['globalScss'];
  vendors: Theme['vendors'];
}

export const createThemeDraft = async ({
  label,
  pageCommandIds,
  featuredImage,
  themeSettings,
  globalJs,
  globalScss,
  vendors,
}: CreateThemeDraft): Promise<DevTheme> => {
  const { role, id } = getUserInfo();
  if (role === 'dev') {
    const response = await themeApis.atom.devApi.theme.createDraftOfDev({
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
        status: 'draft',
        userId: id,
      },
    });
    return handleGlobalTranslationsInThemeDraft(response.info);
  }
  throw new RoleException();
};
