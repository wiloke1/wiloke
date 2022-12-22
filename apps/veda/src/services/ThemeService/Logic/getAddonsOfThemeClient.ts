import { addonApiController } from 'services/AddonService';
import { ProductAddon } from 'types/Addons';

interface GetAddonsOfThemeClient {
  addonCommandIds: string[];
}

export const getAddonsOfThemeClient = async ({ addonCommandIds }: GetAddonsOfThemeClient): Promise<ProductAddon[]> => {
  const responses = await Promise.all(
    addonCommandIds.map(addonCommandId => {
      return addonApiController.client.clientApi.addon.getClient({ commandId: addonCommandId });
    }),
  );
  return responses.reduce<ProductAddon[]>((res, info) => {
    if (info) {
      return res.concat(info);
    }
    return res;
  }, []);

  // const { role } = getUserInfo();
  // if (role === 'admin') {
  //   throw new Error('Chưa lắp api');
  // }
  // if (role === 'user') {
  //   const response = await addonApiController.client.clientApi.addon.getClient({ addonCommandIds })
  //   return response;
  // }
  // throw new RoleException();
};
