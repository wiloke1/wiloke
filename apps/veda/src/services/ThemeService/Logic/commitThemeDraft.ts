import { DevTheme } from 'types/Theme';
import { RoleException } from 'utils/constants/constants';
import { getUserInfo } from 'utils/functions/getUserInfo';
import { handleGlobalTranslationsInThemeDraft } from '../Adapter/handleGlobalTranslations';
import { themeApis } from '../apis';

interface CommitThemeDraft {
  theme: DevTheme;
  message: string;
}

export const commitThemeDraft = async ({ theme }: CommitThemeDraft): Promise<DevTheme> => {
  const { role } = getUserInfo();
  if (role === 'dev') {
    const response = await themeApis.atom.devApi.theme.updateDraftOfDev({
      theme: {
        ...theme,
        status: 'pending',
      },
    });
    return handleGlobalTranslationsInThemeDraft(response.info);
  }
  throw new RoleException();
};
