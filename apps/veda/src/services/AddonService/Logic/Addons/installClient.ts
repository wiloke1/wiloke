import { addonApiController } from 'services/AddonService';
import { adapterGetAddon } from 'services/AddonService/Adapters/adapterGetAddon';
import { AdminAddon } from 'types/Addons';

export const installClientAddon = async (commandId: string) => {
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
};
