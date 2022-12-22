import { megaMenuApiController } from 'services/MegaMenuService';

export const deleteClientMegaMenus = async ({ commandId }: { commandId: string }) => {
  return megaMenuApiController.client.clientApi.mega_menus.deleteClient({ commandId });
};
