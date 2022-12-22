import { sectionApiController } from 'services/SectionService';
import { RoleException } from 'utils/constants/constants';
import { getUserInfo } from 'utils/functions/getUserInfo';

export const deleteListMegaMenuOfAtom = ({ listIds }: { listIds: string[] }) => {
  const { role } = getUserInfo();
  if (role === 'admin') {
    return sectionApiController.atom.adminApi.megaMenu.deleteListMegaMenuOfAtom({ listIds });
  }
  throw new RoleException();
};
