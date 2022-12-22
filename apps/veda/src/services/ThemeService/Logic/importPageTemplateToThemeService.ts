import { RoleException } from 'utils/constants/constants';
import { getUserInfo } from 'utils/functions/getUserInfo';
import { themeApis } from '../apis';

interface ImportPageTemplateToThemeService {
  commandId: string;
}

export const importPageTemplateToThemeService = async ({ commandId }: ImportPageTemplateToThemeService) => {
  const { role } = getUserInfo();
  if (role === 'admin') {
    const response = await themeApis.atom.adminApi.page.migratePageAtomToService({ pageAtomCommandId: commandId });
    return response.info;
  }
  if (role === 'dev') {
    const response = await themeApis.atom.devApi.page.migratePageAtomToService({ pageAtomCommandId: commandId });
    return response.info;
  }
  throw new RoleException();
};
