import { RoleException } from 'utils/constants/constants';
import { getUserInfo } from 'utils/functions/getUserInfo';
import { themeApis } from '../apis';

export const deleteMegaMenuOfThemeDraft = async ({ commandId }: { commandId: string }) => {
  const { role } = getUserInfo();
  if (role === 'admin') {
    return themeApis.atom.adminApi.megamenu.deleteMegaMenuOfDraft({ commandId });
  }
  if (role === 'dev') {
    return themeApis.atom.devApi.megamenu.deleteMegaMenuOfDraft({ commandId });
  }
  throw new RoleException();
};
