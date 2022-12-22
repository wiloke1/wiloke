import { AdminTheme } from 'types/Theme';
import { RoleException } from 'utils/constants/constants';
import { getUserInfo } from 'utils/functions/getUserInfo';
import { handleGlobalTranslationsInThemeAtom } from '../Adapter/handleGlobalTranslations';
import { themeApis } from '../apis';

interface GetThemeAtom {
  commandId: string;
}

export const getThemeAtom = async ({ commandId }: GetThemeAtom): Promise<AdminTheme> => {
  const { role } = getUserInfo();
  if (role === 'admin') {
    const response = await themeApis.atom.adminApi.theme.getAtom({ commandId });
    return handleGlobalTranslationsInThemeAtom(response.info);
  }
  if (role === 'dev') {
    const response = await themeApis.atom.devApi.theme.getAtom({ commandId });
    return handleGlobalTranslationsInThemeAtom(response.info);
  }
  if (role === 'user') {
    const response = await themeApis.atom.userApi.theme.getAtom({ commandId });
    return handleGlobalTranslationsInThemeAtom(response.info);
  }
  throw new RoleException();
};
