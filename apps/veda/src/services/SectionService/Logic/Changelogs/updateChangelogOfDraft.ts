import { sectionApiController } from 'services/SectionService';
import { SectionChangelog } from 'types/Sections';
import { RoleException } from 'utils/constants/constants';
import { getUserInfo } from 'utils/functions/getUserInfo';

export const updateChangelogOfDraft = async (changelog: SectionChangelog) => {
  const { role } = getUserInfo();
  if (role === 'dev') {
    return sectionApiController.atom.devApi.changelogs.updateChangelog({ changelog });
  }
  throw new RoleException();
};
