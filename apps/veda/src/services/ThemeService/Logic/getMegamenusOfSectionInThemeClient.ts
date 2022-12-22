import { megaMenuApiController } from 'services/MegaMenuService';
import { adapterGetMegaMenus } from 'services/MegaMenuService/Adapters/adapterGetMegaMenus';
import { PageSection } from 'types/Sections';

interface GetMegamenusOfSectionInThemeClient {
  megamenuCommandIds: string[];
}

export const getMegamenusOfSectionInThemeClient = async ({ megamenuCommandIds }: GetMegamenusOfSectionInThemeClient): Promise<PageSection[]> => {
  const responses = await megaMenuApiController.client.clientApi.mega_menus.getClients({ commandIds: megamenuCommandIds });
  return adapterGetMegaMenus(
    responses.reduce<PageSection[]>((res, info) => {
      if (info) {
        return res.concat(info);
      }
      return res;
    }, []),
  );

  // const { role } = getUserInfo();
  // if (role === 'admin') {
  //   throw new Error('Chưa lắp api');
  // }
  // if (role === 'user') {
  //   const responses = await Promise.all(
  //     megamenuCommandIds.map(megamenuCommandId => {
  //       return megaMenuApiController.client.clientApi.mega_menus.getClient({ commandId: megamenuCommandId });
  //     }),
  //   );
  //   return adapterGetMegaMenus(responses.map(({ info }) => info));
  // }
  // throw new RoleException();
};
