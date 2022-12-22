import { megaMenuApiController } from 'services/MegaMenuService';
import { adapterGetMegaMenus } from 'services/MegaMenuService/Adapters/adapterGetMegaMenus';
import { PageSection } from 'types/Sections';

interface GetMegamenusOfPageClient {
  megamenuCommandIds: string[];
}

export const getMegamenusOfPageClient = async ({ megamenuCommandIds }: GetMegamenusOfPageClient) => {
  const responses = await megaMenuApiController.client.clientApi.mega_menus.getClients({
    commandIds: megamenuCommandIds,
  });
  return adapterGetMegaMenus(
    responses.reduce<PageSection[]>((res, info) => {
      if (info) {
        return res.concat(info);
      }
      return res;
    }, []),
  );
};
