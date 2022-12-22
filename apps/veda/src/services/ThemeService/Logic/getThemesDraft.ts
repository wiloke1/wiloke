import { DevTheme } from 'types/Theme';
import { RoleException } from 'utils/constants/constants';
import { getUserInfo } from 'utils/functions/getUserInfo';
import { handleGlobalTranslationsInThemeDraft } from '../Adapter/handleGlobalTranslations';
import { themeApis } from '../apis';

export const getThemesDraft = async (): Promise<DevTheme[]> => {
  const { role } = getUserInfo();
  if (role === 'admin') {
    const response = await themeApis.atom.adminApi.theme.getDraftsOfDev({ type: 'GET FIRST PAGE' });
    return response.info.map(item => handleGlobalTranslationsInThemeDraft(item));
  }
  if (role === 'dev') {
    const response = await themeApis.atom.devApi.theme.getDraftsOfDev({ type: 'GET FIRST PAGE' });
    return response.info.map(item => handleGlobalTranslationsInThemeDraft(item));
  }
  throw new RoleException();
};
