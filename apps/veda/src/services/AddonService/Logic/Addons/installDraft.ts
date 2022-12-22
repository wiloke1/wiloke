import { addonApiController } from 'services/AddonService';
import { adapterGetAddon } from 'services/AddonService/Adapters/adapterGetAddon';
import { DevAddon } from 'types/Addons';
import { RoleException } from 'utils/constants/constants';
import { getUserInfo } from 'utils/functions/getUserInfo';

export const installDraftAddon = async (commandId: string) => {
  const { role } = getUserInfo();
  if (role === 'admin') {
    const response = await addonApiController.atom.adminApi.addons.getDraftOfDev({ commandId });
    const data = adapterGetAddon(response.info) as DevAddon;
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
    const response = await addonApiController.atom.devApi.addons.getDraftOfDev({ commandId });
    const data = adapterGetAddon(response) as DevAddon;
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
