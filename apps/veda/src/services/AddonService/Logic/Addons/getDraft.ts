import { addonApiController } from 'services/AddonService';
import { adapterGetAddon } from 'services/AddonService/Adapters/adapterGetAddon';
import { DevAddon } from 'types/Addons';
import { RoleException } from 'utils/constants/constants';
import { getUserInfo } from 'utils/functions/getUserInfo';

export const getDraft = async (commandId: string) => {
  const { role } = getUserInfo();
  if (role === 'admin') {
    const response = await addonApiController.atom.adminApi.addons.getDraftOfDev({ commandId });
    return adapterGetAddon(response.info) as DevAddon;
  }
  if (role === 'dev') {
    const response = await addonApiController.atom.devApi.addons.getDraftOfDev({ commandId });
    return adapterGetAddon(response) as DevAddon;
  }
  throw new RoleException();
};
