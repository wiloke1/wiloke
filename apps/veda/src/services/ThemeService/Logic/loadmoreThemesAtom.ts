import { RoleException } from 'utils/constants/constants';
import { getUserInfo } from 'utils/functions/getUserInfo';
import { handleGlobalTranslationsInThemeAtom } from '../Adapter/handleGlobalTranslations';
import { themeApis } from '../apis';

interface LoadmoreThemesAtom {
  lastCursor: string;
}

export const loadmoreThemesAtom = async ({ lastCursor }: LoadmoreThemesAtom) => {
  const { role } = getUserInfo();
  if (role === 'admin') {
    const response = await themeApis.atom.adminApi.theme.getAtoms({ type: 'LOADMORE', cursor: lastCursor });
    return response.info.map(item => handleGlobalTranslationsInThemeAtom(item));
  }
  if (role === 'dev') {
    const response = await themeApis.atom.devApi.theme.getAtoms({ type: 'LOADMORE', cursor: lastCursor });
    return response.info.map(item => handleGlobalTranslationsInThemeAtom(item));
  }
  throw new RoleException();
};
