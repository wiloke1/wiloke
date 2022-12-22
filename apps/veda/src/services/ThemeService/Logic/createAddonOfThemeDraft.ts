import { AddonOfTheme_Atom_N_Client } from 'types/Addons';
import { RoleException } from 'utils/constants/constants';
import { getUserInfo } from 'utils/functions/getUserInfo';
import { themeApis } from '../apis';

interface CreateAddonOfThemeDraft {
  addon: AddonOfTheme_Atom_N_Client;
}

export const createAddonOfThemeDraft = async ({ addon }: CreateAddonOfThemeDraft) => {
  const { role } = getUserInfo();
  const { commandId: _, ...addonProperties } = addon;
  if (role === 'admin') {
    const response = await themeApis.atom.adminApi.addon.createAddonOfDraft({
      addon: {
        ...addonProperties,
      },
    });
    return response.info;
  }
  if (role === 'dev') {
    const response = await themeApis.atom.devApi.addon.createAddonOfDraft({
      addon: {
        ...addonProperties,
      },
    });
    return response.info;
  }
  throw new RoleException();
};
