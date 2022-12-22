import { addonApiController } from 'services/AddonService';
import { RoleException } from 'utils/constants/constants';
import { getUserInfo } from 'utils/functions/getUserInfo';

export const getChangelogsDraftByCommandId = async (changelogCommandId: string) => {
  const { role } = getUserInfo();
  if (role === 'admin') {
    return addonApiController.atom.devApi.changelogs.getChangelog({ commandId: changelogCommandId });
  }
  if (role === 'dev') {
    return addonApiController.atom.devApi.changelogs.getChangelog({ commandId: changelogCommandId });
  }
  throw new RoleException();
};

export const getChangelogsOfDraft = async (addonCommandId: string) => {
  const { role } = getUserInfo();
  if (role === 'admin') {
    return addonApiController.atom.devApi.changelogs.getChangelogsOfDraft({ addonCommandId });
  }
  if (role === 'dev') {
    return addonApiController.atom.devApi.changelogs.getChangelogsOfDraft({ addonCommandId });
  }
  throw new RoleException();
};
