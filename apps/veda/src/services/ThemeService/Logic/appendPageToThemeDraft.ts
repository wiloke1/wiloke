import { DevTheme } from 'types/Theme';
import { RoleException } from 'utils/constants/constants';
import { getUserInfo } from 'utils/functions/getUserInfo';
import { handleGlobalTranslationsInThemeDraft } from '../Adapter/handleGlobalTranslations';
import { themeApis } from '../apis';

interface AppendPageToThemeDraft {
  theme: Required<
    Pick<Parameters<typeof themeApis.atom.devApi.theme.updateDraftOfDev>[0]['theme'], 'commandId' | 'pageCommandIds' | 'featuredImage' | 'label'>
  >;
}

export const appendPageToThemeDraft = async ({ theme }: AppendPageToThemeDraft): Promise<DevTheme> => {
  const { role } = getUserInfo();
  if (role === 'admin') {
    const response = await themeApis.atom.adminApi.theme.updateDraftOfDev({ theme });
    return handleGlobalTranslationsInThemeDraft(response.info);
  }
  if (role === 'dev') {
    const response = await themeApis.atom.devApi.theme.updateDraftOfDev({ theme });
    return handleGlobalTranslationsInThemeDraft(response.info);
  }
  throw new RoleException();
};
