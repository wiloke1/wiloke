import { addonApiController } from 'services/AddonService';
import { adapterGetAddon } from 'services/AddonService/Adapters/adapterGetAddon';
import { AdminAddon } from 'types/Addons';
import { getUserInfo } from 'utils/functions/getUserInfo';

export const getAtom = async (commandId: string) => {
  const { role } = getUserInfo();
  if (role === 'admin') {
    const response = await addonApiController.atom.adminApi.addons.getAtom({ commandId });
    return adapterGetAddon(response) as AdminAddon;
  }
  const response = await addonApiController.atom.publishApi.addons.getAtom({ commandId });
  return adapterGetAddon(response) as AdminAddon;
};
