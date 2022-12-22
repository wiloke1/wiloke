import { ClientTheme } from 'types/Theme';
import { handleGlobalTranslationsInThemeClient } from '../Adapter/handleGlobalTranslations';
import { themeApis } from '../apis';

interface UpdateThemeClient {
  theme: Required<
    Pick<
      Parameters<typeof themeApis.vedaApplication.userApi.theme.updateClient>[0]['theme'],
      | 'commandId'
      | 'addonCommandIds'
      | 'headerSectionCommandIds'
      | 'footerSectionCommandIds'
      | 'themeSettings'
      | 'globalJs'
      | 'globalScss'
      | 'vendors'
    >
  >;
}

export const updateThemeClient = async ({ theme }: UpdateThemeClient): Promise<ClientTheme> => {
  const response = await themeApis.vedaApplication.userApi.theme.updateClient({
    theme,
  });
  return handleGlobalTranslationsInThemeClient(response.info);
};
