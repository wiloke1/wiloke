import { RoleException } from 'utils/constants/constants';
import { getUserInfo } from 'utils/functions/getUserInfo';
import { themeApis } from '../apis';

export const deleteAddonOfThemeDraft = async ({ commandId }: { commandId: string }) => {
  const { role } = getUserInfo();
  if (role === 'admin') {
    return themeApis.atom.adminApi.addon.deleteAddonOfDraft({ commandId });
  }
  if (role === 'dev') {
    return themeApis.atom.devApi.addon.deleteAddonOfDraft({ commandId });
  }
  throw new RoleException();
};
