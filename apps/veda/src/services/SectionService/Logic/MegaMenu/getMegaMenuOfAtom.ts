import { sectionApiController } from 'services/SectionService';
import { RoleException } from 'utils/constants/constants';
import { getUserInfo } from 'utils/functions/getUserInfo';

export const getMegaMenuOfAtom = async (commandId: string) => {
  const { role } = getUserInfo();

  if (role === 'admin') {
    return sectionApiController.atom.adminApi.megaMenu.getMegamenuOfAtom({ commandId });
  }
  if (role === 'dev') {
    return sectionApiController.atom.publishApi.megaMenu.getMegamenuOfAtom({ commandId });
  }

  throw new RoleException();
};
