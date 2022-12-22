import { RequestThemeSetting } from 'containers/Admin/ThemeBuilder/ThemeSettings/sliceThemeSettingsDashboard';
import { ClientTheme } from 'types/Theme';
import { RoleException } from 'utils/constants/constants';
import { getUserInfo } from 'utils/functions/getUserInfo';
import { handleGlobalTranslationsInThemeClient } from '../Adapter/handleGlobalTranslations';
import { themeApis } from '../apis';
import { BE_ThemeClient } from '../VedaApplication/types';

export const updateThemeSettingsClient = async ({
  commandId,
  themeSettings,
}: {
  commandId: string;
  themeSettings: Partial<RequestThemeSetting>;
}): Promise<ClientTheme> => {
  const { role } = getUserInfo();
  if (role === 'user' || role === 'admin' || role === 'dev') {
    const response = await themeApis.vedaApplication.userApi.theme.updateClient({
      theme: { commandId, ...(themeSettings as BE_ThemeClient['themeSettings']) },
    });

    return handleGlobalTranslationsInThemeClient(response.info);
  }
  throw new RoleException();
};
