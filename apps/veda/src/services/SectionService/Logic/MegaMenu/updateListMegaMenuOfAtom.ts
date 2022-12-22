import { sectionApiController } from 'services/SectionService';
import { AdminSection } from 'types/Sections';
import { RoleException } from 'utils/constants/constants';
import { getUserInfo } from 'utils/functions/getUserInfo';

export const updateListMegaMenuOfAtom = async (listMegaMenu: AdminSection[]) => {
  const { role } = getUserInfo();

  if (role === 'admin') {
    const responses = await Promise.all(
      listMegaMenu.map(megaMenu => {
        return sectionApiController.atom.adminApi.megaMenu.updateMegamenuOfAtom({ megamenu: megaMenu });
      }),
    );
    return responses.map(({ info }) => info);
  }

  throw new RoleException();
};
