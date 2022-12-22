import { AddonOfTheme_Atom_N_Client } from 'types/Addons';
import { RoleException } from 'utils/constants/constants';
import { getUserInfo } from 'utils/functions/getUserInfo';
import { themeApis } from '../apis';

interface UpdateAddonOfThemeAtom {
  addon: AddonOfTheme_Atom_N_Client;
}

export const updateAddonOfThemeAtom = async ({ addon }: UpdateAddonOfThemeAtom) => {
  const { role } = getUserInfo();
  if (role === 'admin') {
    const response = await themeApis.atom.adminApi.addon.updateAddonOfAtom({
      addon,
    });
    return response.info;
  }
  throw new RoleException();
};
