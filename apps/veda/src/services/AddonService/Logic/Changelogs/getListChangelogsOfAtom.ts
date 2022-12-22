import { addonApiController } from 'services/AddonService';
import { RoleException } from 'utils/constants/constants';
import { getUserInfo } from 'utils/functions/getUserInfo';

export const getListChangelogsOfAtoms = async (addonCommandIds: string[]) => {
  const { role } = getUserInfo();
  if (role === 'admin') {
    return addonApiController.atom.adminApi.changelogs.getListChangelogsOfAtoms({ addonCommandIds: addonCommandIds.join(',') });
  }
  throw new RoleException();
};
