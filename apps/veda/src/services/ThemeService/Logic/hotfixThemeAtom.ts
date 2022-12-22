import { DevTheme } from 'types/Theme';
import { RoleException } from 'utils/constants/constants';
import { getUserInfo } from 'utils/functions/getUserInfo';
import { handleGlobalTranslationsInThemeDraft } from '../Adapter/handleGlobalTranslations';
import { themeApis } from '../apis';

type HotfixThemeAtom = Parameters<typeof themeApis.atom.adminApi.theme.rejectAtom>[0];

export const hotfixThemeAtom = async (params: HotfixThemeAtom): Promise<DevTheme> => {
  const { role } = getUserInfo();
  if (role === 'admin') {
    const response = await themeApis.atom.adminApi.theme.rejectAtom(params);
    return handleGlobalTranslationsInThemeDraft(response.info);
  }
  throw new RoleException();
};
