import { AddonOfTheme_Atom_N_Client } from 'types/Addons';
import { RoleException } from 'utils/constants/constants';
import { getUserInfo } from 'utils/functions/getUserInfo';
import { themeApis } from '../apis';

interface UpdateAddonOfThemeDraft {
  addon: AddonOfTheme_Atom_N_Client;
}

export const updateAddonOfThemeDraft = async ({ addon }: UpdateAddonOfThemeDraft) => {
  const { role } = getUserInfo();
  if (role === 'admin') {
    const response = await themeApis.atom.adminApi.addon.updateAddonOfDraft({
      addon,
    });
    return response.info;
  }
  if (role === 'dev') {
    const response = await themeApis.atom.devApi.addon.updateAddonOfDraft({
      addon,
    });
    return response.info;
  }
  throw new RoleException();
};
