import { adapterGetMegaMenus } from 'services/MegaMenuService/Adapters/adapterGetMegaMenus';
import { sectionApiController } from 'services/SectionService';
import { AdminSection } from 'types/Sections';
import { RoleException } from 'utils/constants/constants';
import { getUserInfo } from 'utils/functions/getUserInfo';

export const searchMegaMenusOfAtom = async (megaMenuCommandIds: string[]) => {
  const { role } = getUserInfo();
  if (role === 'admin') {
    const response = await sectionApiController.atom.adminApi.megaMenu.searchMegaMenusOfAtom({ commandIds: megaMenuCommandIds.join(',') });
    return adapterGetMegaMenus(response) as AdminSection[];
  }
  if (role === 'dev') {
    const response = await sectionApiController.atom.publishApi.megaMenu.searchMegaMenusOfAtom({ commandIds: megaMenuCommandIds.join(',') });
    return adapterGetMegaMenus(response) as AdminSection[];
  }
  throw new RoleException();
};
