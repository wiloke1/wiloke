import { RoleException } from 'utils/constants/constants';
import { getUserInfo } from 'utils/functions/getUserInfo';
import { handleGlobalTranslationsInThemeDraft } from '../Adapter/handleGlobalTranslations';
import { themeApis } from '../apis';

interface LoadmoreThemesDraft {
  lastCursor: string;
}

export const loadmoreThemesDraft = async ({ lastCursor }: LoadmoreThemesDraft) => {
  const { role } = getUserInfo();
  if (role === 'admin') {
    const response = await themeApis.atom.adminApi.theme.getDraftsOfDev({ type: 'LOADMORE', cursor: lastCursor });
    return response.info.map(item => handleGlobalTranslationsInThemeDraft(item));
  }
  if (role === 'dev') {
    const response = await themeApis.atom.devApi.theme.getDraftsOfDev({ type: 'LOADMORE', cursor: lastCursor });
    return response.info.map(item => handleGlobalTranslationsInThemeDraft(item));
  }
  throw new RoleException();
};
