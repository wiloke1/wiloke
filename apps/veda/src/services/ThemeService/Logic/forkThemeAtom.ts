import { DevTheme } from 'types/Theme';
import { RoleException } from 'utils/constants/constants';
import { getUserInfo } from 'utils/functions/getUserInfo';
import { handleGlobalTranslationsInThemeDraft } from '../Adapter/handleGlobalTranslations';
import { themeApis } from '../apis';

interface ForkThemeAtom {
  commandId: string;
}

export const forkThemeAtom = async ({ commandId }: ForkThemeAtom): Promise<DevTheme> => {
  const { role } = getUserInfo();
  if (role === 'dev') {
    const response = await themeApis.atom.devApi.theme.forkAtom({ parentCommandId: commandId });
    return handleGlobalTranslationsInThemeDraft(response.info);
  }
  throw new RoleException();
};
