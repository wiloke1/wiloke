import { addonApiController } from 'services/AddonService';
import { SectionChangelog } from 'types/Sections';
import { RoleException } from 'utils/constants/constants';
import { getUserInfo } from 'utils/functions/getUserInfo';

export const createChangelogOfDraft = async ({ content, version, versionId }: Omit<SectionChangelog, 'commandId'>) => {
  const { role } = getUserInfo();
  if (role === 'dev') {
    return addonApiController.atom.devApi.changelogs.createChangelog({ changelog: { content, version, versionId } });
  }
  throw new RoleException();
};
