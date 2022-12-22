import { addonApiController } from 'services/AddonService';
import { adapterGetAddon } from 'services/AddonService/Adapters/adapterGetAddon';
import { AdminAddon } from 'types/Addons';
import { RoleException } from 'utils/constants/constants';
import { getUserInfo } from 'utils/functions/getUserInfo';

export const installAtomAddon = async (commandId: string) => {
  const { role } = getUserInfo();
  if (role === 'admin') {
    const response = await addonApiController.atom.adminApi.addons.getAtom({ commandId });
    const data = adapterGetAddon(response) as AdminAddon;

    return {
      ...data,
      commandId: '',
      parentCommandId: data.commandId,
      body: {
        ...data.body,
        commandId: '',
        parentCommandId: data.commandId,
      },
    };
  }
  if (role === 'dev') {
    const response = await addonApiController.atom.publishApi.addons.getAtom({ commandId });
    const data = adapterGetAddon(response) as AdminAddon;

    return {
      ...data,
      commandId: '',
      parentCommandId: data.commandId,
      body: {
        ...data.body,
        commandId: '',
        parentCommandId: data.commandId,
      },
    };
  }
  throw new RoleException();
};
