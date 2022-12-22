import { addonApiController } from 'services/AddonService';
import { AddonOfTheme_Atom_N_Client } from 'types/Addons';

interface UpdateAddonOfThemeClient {
  addon: AddonOfTheme_Atom_N_Client;
}

export const updateAddonOfThemeClient = async ({ addon }: UpdateAddonOfThemeClient) => {
  const response = await addonApiController.client.clientApi.addon.updateClient({
    addon,
  });
  return response.info;

  // const { role } = getUserInfo();
  // if (role === 'admin') {
  //   throw new Error('Chưa lắp api');
  // }
  // if (role === 'user') {
  //   const response = await addonApiController.client.clientApi.addon.updateClient({
  //     addon,
  //   });
  //   return response.info;
  // }
  // throw new RoleException();
};
