import { adapterGetMegaMenus } from 'services/MegaMenuService/Adapters/adapterGetMegaMenus';
import { sectionApiController } from 'services/SectionService';
import { AdminSection } from 'types/Sections';
import { RoleException } from 'utils/constants/constants';
import { getUserInfo } from 'utils/functions/getUserInfo';

export const searchMegaMenusOfPublish = async (megaMenuCommandIds: string[]) => {
  const { role } = getUserInfo();
  if (role === 'admin' || role === 'dev' || role === 'user') {
    const response = await sectionApiController.atom.publishApi.megaMenu.searchMegaMenusOfAtom({ commandIds: megaMenuCommandIds.join(',') });
    return adapterGetMegaMenus(response) as AdminSection[];
  }
  throw new RoleException();
};
