import { megaMenuApiController } from 'services/MegaMenuService';
import { RoleException } from 'utils/constants/constants';
import { getUserInfo } from 'utils/functions/getUserInfo';

export const getListChangelogsOfAtoms = async (sectionCommandIds: string[]) => {
  const { role } = getUserInfo();
  if (role === 'admin') {
    return megaMenuApiController.atom.adminApi.changelogs.getListChangelogsOfAtoms({ sectionCommandIds: sectionCommandIds.join(',') });
  }
  throw new RoleException();
};
