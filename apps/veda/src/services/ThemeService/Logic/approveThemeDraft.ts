import { AdminTheme } from 'types/Theme';
import { RoleException } from 'utils/constants/constants';
import { getUserInfo } from 'utils/functions/getUserInfo';
import { handleGlobalTranslationsInThemeAtom } from '../Adapter/handleGlobalTranslations';
import { themeApis } from '../apis';

interface ApproveThemeDraft {
  commandId: string;
}

export const approveThemeDraft = async ({ commandId }: ApproveThemeDraft): Promise<AdminTheme> => {
  const { role } = getUserInfo();
  if (role === 'admin') {
    const response = await themeApis.atom.adminApi.theme.approveDraftToAtom({ themeDevId: commandId });
    return handleGlobalTranslationsInThemeAtom(response.info);
  }
  throw new RoleException();
};
