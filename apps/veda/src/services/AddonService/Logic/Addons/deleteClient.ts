import { addonApiController } from 'services/AddonService';

export const deleteClientAddons = async ({ commandId }: { commandId: string }) => {
  return addonApiController.client.clientApi.addon.deleteClient({ commandId });
};
