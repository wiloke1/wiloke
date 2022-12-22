import { addonApiController } from 'services/AddonService';
import { RoleException } from 'utils/constants/constants';
import { getUserInfo } from 'utils/functions/getUserInfo';

export const deleteAtom = async (commandId: string) => {
  const { role } = getUserInfo();
  if (role === 'admin') {
    return addonApiController.atom.adminApi.addons.deleteAtom({ commandId });
  }
  throw new RoleException();
};
