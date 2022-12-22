import { megaMenuApiController } from 'services/MegaMenuService';
import { adapterGetMegaMenu } from 'services/MegaMenuService/Adapters/adapterGetMegaMenu';
import { AdminSection } from 'types/Sections';
import { RoleException } from 'utils/constants/constants';
import { getUserInfo } from 'utils/functions/getUserInfo';

export const getAtomSection = async (commandId: string) => {
  const { role } = getUserInfo();
  if (role === 'admin') {
    const response = await megaMenuApiController.atom.adminApi.mega_menu.getAtom({ commandId });
    return adapterGetMegaMenu(response.info) as AdminSection;
  }
  if (role === 'dev') {
    const response = await megaMenuApiController.atom.publishApi.mega_menu.getAtom({ commandId });
    return adapterGetMegaMenu(response.info) as AdminSection;
  }
  throw new RoleException();
};
