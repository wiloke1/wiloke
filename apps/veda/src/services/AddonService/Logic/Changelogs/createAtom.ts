import { addonApiController } from 'services/AddonService';
import { SectionChangelog } from 'types/Sections';
import { RoleException } from 'utils/constants/constants';
import { getUserInfo } from 'utils/functions/getUserInfo';

export const createChangelogOfAtom = async ({ content, version, versionId }: Omit<SectionChangelog, 'commandId'>) => {
  const { role } = getUserInfo();
  if (role === 'admin') {
    return addonApiController.atom.adminApi.changelogs.createChangelog({ changelog: { content, version, versionId } });
  }
  throw new RoleException();
};
