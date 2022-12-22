import { megaMenuApiController } from 'services/MegaMenuService';
import { adapterGetMegaMenus } from 'services/MegaMenuService/Adapters/adapterGetMegaMenus';
import { AdminSection } from 'types/Sections';
import { RoleException } from 'utils/constants/constants';
import { getUserInfo } from 'utils/functions/getUserInfo';

export const getAtomSections = async (categoryName: string) => {
  const { role } = getUserInfo();
  if (role === 'admin') {
    const response = await megaMenuApiController.atom.adminApi.mega_menu.getAtoms({ type: 'GET FIRST PAGE', category: categoryName });
    return adapterGetMegaMenus(response.info) as AdminSection[];
  }
  if (role === 'dev') {
    const response = await megaMenuApiController.atom.publishApi.mega_menu.getAtoms({ type: 'GET FIRST PAGE', category: categoryName });
    return adapterGetMegaMenus(response.info) as AdminSection[];
  }
  throw new RoleException();
};

export const loadMoreAtomSections = async (categoryName: string, cursor: string) => {
  const { role } = getUserInfo();
  if (role === 'admin') {
    const response = await megaMenuApiController.atom.adminApi.mega_menu.getAtoms({ type: 'LOADMORE', category: categoryName, lastCursor: cursor });
    return adapterGetMegaMenus(response.info) as AdminSection[];
  }
  if (role === 'dev') {
    const response = await megaMenuApiController.atom.publishApi.mega_menu.getAtoms({ type: 'LOADMORE', category: categoryName, lastCursor: cursor });
    return adapterGetMegaMenus(response.info) as AdminSection[];
  }
  throw new RoleException();
};
