import { addonApiController } from 'services/AddonService';
import { RoleException } from 'utils/constants/constants';
import { getUserInfo } from 'utils/functions/getUserInfo';

export const rejectAtom = async (commandId: string, devId?: number, comment?: string) => {
  const { role } = getUserInfo();
  if (role === 'admin') {
    return addonApiController.atom.adminApi.addons.rejectAtom({ commandId, comment, devId });
  }
  throw new RoleException();
};
