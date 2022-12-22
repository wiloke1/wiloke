import { megaMenuApiController } from 'services/MegaMenuService';
import { SectionChangelog } from 'types/Sections';
import { RoleException } from 'utils/constants/constants';
import { getUserInfo } from 'utils/functions/getUserInfo';

export const updateChangelogOfDraft = async (changelog: SectionChangelog) => {
  const { role } = getUserInfo();
  if (role === 'dev') {
    return megaMenuApiController.atom.devApi.changelogs.updateChangelog({ changelog });
  }
  throw new RoleException();
};
