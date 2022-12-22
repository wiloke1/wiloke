import { addonApiController } from 'services/AddonService';
import { AddonOfTheme_Atom_N_Client } from 'types/Addons';

interface CreateAddonOfThemeClient {
  addon: AddonOfTheme_Atom_N_Client;
}

export const createAddonOfThemeClient = async ({ addon }: CreateAddonOfThemeClient) => {
  const { commandId: _, ...addonProperties } = addon;
  const response = await addonApiController.client.clientApi.addon.createClient({
    addon: {
      ...addonProperties,
    },
  });
  return response.info;

  // const { role } = getUserInfo();
  // const { commandId: _, ...addonProperties } = addon;
  // if (role === 'admin') {
  //   throw new Error('Chưa lắp api');
  // }
  // if (role === 'user') {
  //   const response = await addonApiController.client.clientApi.addon.createClient({
  //     addon: {
  //       ...addonProperties,
  //     },
  //   });
  //   return response.info;
  // }
  // throw new RoleException();
};
