import { ThemeGeneral } from 'types/Theme';
import { handleGlobalTranslationsInThemeClient } from '../Adapter/handleGlobalTranslations';
import { themeApis } from '../apis';

interface ActiveThemeClientService {
  commandId: string;
}

export const activeThemeClientService = async ({ commandId }: ActiveThemeClientService): Promise<ThemeGeneral> => {
  const response = await themeApis.vedaApplication.userApi.theme.activeClient({ commandId });
  return handleGlobalTranslationsInThemeClient(response.info);
};
