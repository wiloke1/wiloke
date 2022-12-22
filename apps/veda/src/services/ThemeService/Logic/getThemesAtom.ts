import { AdminTheme } from 'types/Theme';
import { RoleException } from 'utils/constants/constants';
import { getUserInfo } from 'utils/functions/getUserInfo';
import { handleGlobalTranslationsInThemeAtom } from '../Adapter/handleGlobalTranslations';
import { themeApis } from '../apis';

export const getThemesAtom = async (): Promise<AdminTheme[]> => {
  const { role } = getUserInfo();
  if (role === 'admin') {
    const response = await themeApis.atom.adminApi.theme.getAtoms({ type: 'GET FIRST PAGE' });
    return response.info.map(item => handleGlobalTranslationsInThemeAtom(item));
  }
  if (role === 'dev') {
    const response = await themeApis.atom.devApi.theme.getAtoms({ type: 'GET FIRST PAGE' });
    return response.info.map(item => handleGlobalTranslationsInThemeAtom(item));
  }
  throw new RoleException();
};
