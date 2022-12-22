import { ClientTheme } from 'types/Theme';
import { handleGlobalTranslationsInThemeClient } from '../Adapter/handleGlobalTranslations';
import { themeApis } from '../apis';

interface GetThemeClient {
  commandId: string;
}

export const getThemeClient = async ({ commandId }: GetThemeClient): Promise<ClientTheme> => {
  const response = await themeApis.vedaApplication.userApi.theme.getClient({ commandId });
  return handleGlobalTranslationsInThemeClient(response.info);

  // const { role } = getUserInfo();
  // if (role === 'admin') {
  //   throw new Error('Chưa lắp api');
  // }
  // if (role === 'user') {
  //   return themeApis.vedaApplication.userApi.theme.getClient({ commandId });
  // }
  // throw new RoleException();
};
