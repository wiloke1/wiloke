import { addonApiController } from 'services/AddonService';
import { SectionChangelog } from 'types/Sections';
import { RoleException } from 'utils/constants/constants';
import { getUserInfo } from 'utils/functions/getUserInfo';

export const updateChangelogOfAtom = async (changelog: SectionChangelog) => {
  const { role } = getUserInfo();
  if (role === 'admin') {
    return addonApiController.atom.adminApi.changelogs.updateChangelog({ changelog });
  }
  throw new RoleException();
};
