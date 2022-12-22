import { DevTheme } from 'types/Theme';
import { RoleException } from 'utils/constants/constants';
import { getUserInfo } from 'utils/functions/getUserInfo';
import { handleGlobalTranslationsInThemeDraft } from '../Adapter/handleGlobalTranslations';
import { themeApis } from '../apis';

interface RejectThemeDraft {
  theme: DevTheme;
  message: string;
}

export const rejectThemeDraft = async ({ theme }: RejectThemeDraft): Promise<DevTheme> => {
  const { role } = getUserInfo();
  const { commandId } = theme;
  if (role === 'admin') {
    const response = await themeApis.atom.adminApi.theme.updateDraftOfDev({
      theme: {
        commandId,
        status: 'draft',
      },
    });
    return handleGlobalTranslationsInThemeDraft(response.info);
  }
  throw new RoleException();
};
