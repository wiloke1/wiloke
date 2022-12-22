import { megaMenuApiController } from 'services/MegaMenuService';
import { RoleException } from 'utils/constants/constants';
import { getUserInfo } from 'utils/functions/getUserInfo';

export const getChangelogsDraftByCommandId = async (changelogCommandId: string) => {
  const { role } = getUserInfo();
  if (role === 'dev') {
    return megaMenuApiController.atom.devApi.changelogs.getChangelog({ commandId: changelogCommandId });
  }
  throw new RoleException();
};

export const getChangelogsOfDraft = async (sectionCommandId: string) => {
  const { role } = getUserInfo();
  if (role === 'dev') {
    return megaMenuApiController.atom.devApi.changelogs.getChangelogsOfDraft({ sectionCommandId });
  }
  throw new RoleException();
};
