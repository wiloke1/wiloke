import { sectionApiController } from 'services/SectionService';
import { AdminSection } from 'types/Sections';
import { RoleException } from 'utils/constants/constants';
import { getUserInfo } from 'utils/functions/getUserInfo';

export const createMegaMenuOfAtom = async (adminSection: AdminSection) => {
  const { role } = getUserInfo();

  if (role === 'admin') {
    return sectionApiController.atom.adminApi.megaMenu.createMegamenuOfAtom({ megamenu: { ...adminSection, commandId: undefined } });
  }
  throw new RoleException();
};
