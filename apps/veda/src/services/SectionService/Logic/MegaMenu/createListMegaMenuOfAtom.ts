import { sectionApiController } from 'services/SectionService';
import { AdminSection } from 'types/Sections';
import { RoleException } from 'utils/constants/constants';
import { getUserInfo } from 'utils/functions/getUserInfo';

export const createListMegaMenuOfAtom = async (listMegaMenu: AdminSection[]) => {
  const { role } = getUserInfo();

  if (role === 'admin') {
    return sectionApiController.atom.adminApi.megaMenu.createListMegaMenuOfAtom({
      listMegaMenu: listMegaMenu.map(item => ({ ...item, commandId: undefined })),
    });
  }

  throw new RoleException();
};
