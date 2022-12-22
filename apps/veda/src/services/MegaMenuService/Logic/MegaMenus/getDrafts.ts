import { megaMenuApiController } from 'services/MegaMenuService';
import { adapterGetMegaMenus } from 'services/MegaMenuService/Adapters/adapterGetMegaMenus';
import { DevSection } from 'types/Sections';
import { RoleException } from 'utils/constants/constants';
import { getUserInfo } from 'utils/functions/getUserInfo';

export const getDraftSections = async (categoryName: string) => {
  const { role } = getUserInfo();
  if (role === 'admin') {
    const response = await megaMenuApiController.atom.adminApi.mega_menu.getDraftsOfDev({ type: 'GET FIRST PAGE', category: categoryName });
    return adapterGetMegaMenus(response.info) as DevSection[];
  }
  if (role === 'dev') {
    const response = await megaMenuApiController.atom.devApi.mega_menu.getDraftsOfDev({ type: 'GET FIRST PAGE', category: categoryName });
    return adapterGetMegaMenus(response.info) as DevSection[];
  }
  throw new RoleException();
};

export const loadMoreDraftSections = async (categoryName: string, cursor: string) => {
  const { role } = getUserInfo();
  if (role === 'admin') {
    const response = await megaMenuApiController.atom.adminApi.mega_menu.getDraftsOfDev({
      type: 'LOADMORE',
      category: categoryName,
      lastCursor: cursor,
    });
    return adapterGetMegaMenus(response.info) as DevSection[];
  }
  if (role === 'dev') {
    const response = await megaMenuApiController.atom.devApi.mega_menu.getDraftsOfDev({
      type: 'LOADMORE',
      category: categoryName,
      lastCursor: cursor,
    });
    return adapterGetMegaMenus(response.info) as DevSection[];
  }
  throw new RoleException();
};
