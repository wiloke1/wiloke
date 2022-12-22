import { megaMenuApiController } from 'services/MegaMenuService';
import { RoleException } from 'utils/constants/constants';
import { getUserInfo } from 'utils/functions/getUserInfo';

export const getListChangelogsOfDrafts = async (sectionCommandIds: string[]) => {
  const { role } = getUserInfo();
  if (role === 'dev') {
    return megaMenuApiController.atom.devApi.changelogs.getListChangelogsOfDrafts({ sectionCommandIds: sectionCommandIds.join(',') });
  }
  throw new RoleException();
};
