import { DevTheme } from 'types/Theme';
import { RoleException } from 'utils/constants/constants';
import { getUserInfo } from 'utils/functions/getUserInfo';
import { handleGlobalTranslationsInThemeDraft } from '../Adapter/handleGlobalTranslations';
import { themeApis } from '../apis';

interface UpdateThemeDraft {
  theme: Required<
    Pick<
      Parameters<typeof themeApis.atom.adminApi.theme.updateDraftOfDev>[0]['theme'],
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

export const updateThemeDraft = async ({ theme }: UpdateThemeDraft): Promise<DevTheme> => {
  const { role } = getUserInfo();

  if (role === 'admin') {
    const response = await themeApis.atom.adminApi.theme.updateDraftOfDev({
      theme: { ...theme, status: 'pending' },
    });
    return handleGlobalTranslationsInThemeDraft(response.info);
  }
  if (role === 'dev') {
    const response = await themeApis.atom.devApi.theme.updateDraftOfDev({
      theme: { ...theme, status: 'draft' },
    });
    return handleGlobalTranslationsInThemeDraft(response.info);
  }

  throw new RoleException();
};
