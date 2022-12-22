import { DevTheme } from 'types/Theme';
import { RoleException } from 'utils/constants/constants';
import { getUserInfo } from 'utils/functions/getUserInfo';
import { handleGlobalTranslationsInThemeDraft } from '../Adapter/handleGlobalTranslations';
import { themeApis } from '../apis';

interface GetThemeDraft {
  commandId: string;
}

export const getThemeDraft = async ({ commandId }: GetThemeDraft): Promise<DevTheme> => {
  const { role } = getUserInfo();
  if (role === 'admin') {
    const response = await themeApis.atom.adminApi.theme.getDraftOfDev({ commandId });
    return handleGlobalTranslationsInThemeDraft(response.info);
  }
  if (role === 'dev') {
    const response = await themeApis.atom.devApi.theme.getDraftOfDev({ commandId });
    return handleGlobalTranslationsInThemeDraft(response.info);
  }
  throw new RoleException();
};
