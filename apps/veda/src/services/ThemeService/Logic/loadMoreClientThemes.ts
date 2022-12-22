import { ClientTheme } from 'types/Theme';
import { RoleException } from 'utils/constants/constants';
import { getUserInfo } from 'utils/functions/getUserInfo';
import { handleGlobalTranslationsInThemeClient } from '../Adapter/handleGlobalTranslations';
import { themeApis } from '../apis';

interface LoadMoreClientThemesAPI {
  lastCursor: string;
}

export const loadMoreClientThemesAPI = async ({ lastCursor }: LoadMoreClientThemesAPI): Promise<ClientTheme[]> => {
  const { role } = getUserInfo();
  if (role === 'user' || role === 'admin' || role === 'dev') {
    const response = await themeApis.vedaApplication.userApi.theme.getClients({ type: 'LOADMORE', lastCursor });
    return response.info.map(item => handleGlobalTranslationsInThemeClient(item));
  }
  throw new RoleException();
};
