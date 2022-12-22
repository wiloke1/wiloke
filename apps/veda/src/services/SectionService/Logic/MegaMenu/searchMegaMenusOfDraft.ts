import { adapterGetMegaMenus } from 'services/MegaMenuService/Adapters/adapterGetMegaMenus';
import { sectionApiController } from 'services/SectionService';
import { DevSection } from 'types/Sections';
import { RoleException } from 'utils/constants/constants';
import { getUserInfo } from 'utils/functions/getUserInfo';

export const searchMegaMenusOfDraft = async (megaMenuCommandIds: string[]) => {
  const { role } = getUserInfo();
  if (role === 'dev' || role === 'admin') {
    const response = await sectionApiController.atom.devApi.megaMenu.searchMegaMenusOfDraft({ commandIds: megaMenuCommandIds.join(',') });
    return adapterGetMegaMenus(response) as DevSection[];
  }
  throw new RoleException();
};
