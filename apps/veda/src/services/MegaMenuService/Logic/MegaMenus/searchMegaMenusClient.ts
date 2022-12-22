import { megaMenuApiController } from 'services/MegaMenuService';
import { adapterGetMegaMenus } from 'services/MegaMenuService/Adapters/adapterGetMegaMenus';
import { ProductSection } from 'types/Sections';
import { RoleException } from 'utils/constants/constants';
import { getUserInfo } from 'utils/functions/getUserInfo';

export const searchMegaMenusClient = async (megaMenuCommandIds: string[]) => {
  const { role } = getUserInfo();
  if (role === 'admin' || role === 'dev' || role === 'user') {
    const response = await megaMenuApiController.client.clientApi.mega_menus.searchClients({ commandIds: megaMenuCommandIds });
    return adapterGetMegaMenus(response.info) as ProductSection[];
  }
  throw new RoleException();
};
