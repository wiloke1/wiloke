import { ClientTheme } from 'types/Theme';
import { RoleException } from 'utils/constants/constants';
import { getUserInfo } from 'utils/functions/getUserInfo';
import { handleGlobalTranslationsInThemeClient } from '../Adapter/handleGlobalTranslations';
import { themeApis } from '../apis';

export const getClientThemesAPI = async (): Promise<ClientTheme[]> => {
  const { role } = getUserInfo();
  if (role === 'user' || role === 'admin' || role === 'dev') {
    const response = await themeApis.vedaApplication.userApi.theme.getClients({ type: 'GET FIRST PAGE' });
    return response.info.map(item => handleGlobalTranslationsInThemeClient(item));
  }
  throw new RoleException();
};
