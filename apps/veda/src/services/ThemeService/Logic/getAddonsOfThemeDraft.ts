import { AddonOfTheme_Atom_N_Client } from 'types/Addons';
import { RoleException } from 'utils/constants/constants';
import { getUserInfo } from 'utils/functions/getUserInfo';
import { themeApis } from '../apis';

interface GetAddonsOfThemeDraft {
  addonCommandIds: string[];
}

export const getAddonsOfThemeDraft = async ({ addonCommandIds }: GetAddonsOfThemeDraft): Promise<AddonOfTheme_Atom_N_Client[]> => {
  const { role } = getUserInfo();
  if (role === 'admin') {
    const responses = await Promise.all(
      addonCommandIds.map(addonCommandId => {
        return themeApis.atom.adminApi.addon.getAddonOfDraft({ commandId: addonCommandId });
      }),
    );
    return responses.reduce<AddonOfTheme_Atom_N_Client[]>((res, { info }) => {
      if (info) {
        return res.concat(info);
      }
      return res;
    }, []);
  }
  if (role === 'dev') {
    const responses = await Promise.all(
      addonCommandIds.map(addonCommandId => {
        return themeApis.atom.devApi.addon.getAddonOfDraft({ commandId: addonCommandId });
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
