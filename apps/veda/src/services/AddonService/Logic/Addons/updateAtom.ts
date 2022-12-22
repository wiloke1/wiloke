import { addonApiController } from 'services/AddonService';
import { adapterCreateOrUpdateAddon } from 'services/AddonService/Adapters/adapterCreateOrUpdateAddon';
import { AdminAddon } from 'types/Addons';
import { RoleException } from 'utils/constants/constants';
import { getUserInfo } from 'utils/functions/getUserInfo';

export const updateAtom = async (addon: AdminAddon) => {
  const { role } = getUserInfo();
  if (role === 'admin') {
    const response = await addonApiController.atom.adminApi.addons.updateAtom({ addon });
    return {
      info: adapterCreateOrUpdateAddon(response.info) as AdminAddon,
      message: response.message,
    };
  }
  throw new RoleException();
};
