import { megaMenuApiController } from 'services/MegaMenuService';
import { AdminSection } from 'types/Sections';
import { RoleException } from 'utils/constants/constants';
import { getUserInfo } from 'utils/functions/getUserInfo';

export const updateAtomSection = async (section: AdminSection) => {
  const { role } = getUserInfo();
  if (role === 'admin') {
    return megaMenuApiController.atom.adminApi.mega_menu.updateAtom({ section: section as AdminSection });
  }
  throw new RoleException();
};
