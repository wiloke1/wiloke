import { sectionApiController } from 'services/SectionService';
import { RoleException } from 'utils/constants/constants';
import { getUserInfo } from 'utils/functions/getUserInfo';

export const getListChangelogsOfDrafts = async (sectionCommandIds: string[]) => {
  const { role } = getUserInfo();
  if (role === 'dev') {
    return sectionApiController.atom.devApi.changelogs.getListChangelogsOfDrafts({ sectionCommandIds: sectionCommandIds.join(',') });
  }
  throw new RoleException();
};
