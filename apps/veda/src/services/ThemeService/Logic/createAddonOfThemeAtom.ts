import { AddonOfTheme_Atom_N_Client } from 'types/Addons';
import { RoleException } from 'utils/constants/constants';
import { getUserInfo } from 'utils/functions/getUserInfo';
import { themeApis } from '../apis';

interface CreateAddonOfThemeAtom {
  addon: AddonOfTheme_Atom_N_Client;
}

export const createAddonOfThemeAtom = async ({ addon }: CreateAddonOfThemeAtom) => {
  const { role } = getUserInfo();
  const { commandId: _, ...addonProperties } = addon;
  if (role === 'admin') {
    const response = await themeApis.atom.adminApi.addon.createAddonOfAtom({
      addon: {
        ...addonProperties,
      },
    });
    return response.info;
  }
  throw new RoleException();
};
