import { addonApiController } from 'services/AddonService';
import { RoleException } from 'utils/constants/constants';
import { getUserInfo } from 'utils/functions/getUserInfo';

export const getListChangelogsOfDrafts = async (addonCommandIds: string[]) => {
  const { role } = getUserInfo();
  if (role === 'dev') {
    return addonApiController.atom.devApi.changelogs.getListChangelogsOfDrafts({ addonCommandIds: addonCommandIds.join(',') });
  }
  throw new RoleException();
};
