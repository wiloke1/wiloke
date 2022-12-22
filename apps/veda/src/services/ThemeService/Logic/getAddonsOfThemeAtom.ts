import { AddonOfTheme_Atom_N_Client } from 'types/Addons';
import { RoleException } from 'utils/constants/constants';
import { getUserInfo } from 'utils/functions/getUserInfo';
import { themeApis } from '../apis';

interface GetAddonsOfThemeAtom {
  addonCommandIds: string[];
}

export const getAddonsOfThemeAtom = async ({ addonCommandIds }: GetAddonsOfThemeAtom): Promise<AddonOfTheme_Atom_N_Client[]> => {
  const { role } = getUserInfo();
  if (role === 'admin') {
    const responses = await Promise.all(
      addonCommandIds.map(addonCommandId => {
        return themeApis.atom.adminApi.addon.getAddonOfAtom({ commandId: addonCommandId });
      }),
    );
    return responses.reduce<AddonOfTheme_Atom_N_Client[]>((res, { info }) => {
      if (info) {
        return res.concat(info);
      }
      return res;
    }, []);
  }
  throw new RoleException();
};
