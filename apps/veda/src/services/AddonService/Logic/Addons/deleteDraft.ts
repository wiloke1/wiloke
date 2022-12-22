import { addonApiController } from 'services/AddonService';
import { RoleException } from 'utils/constants/constants';
import { getUserInfo } from 'utils/functions/getUserInfo';

export const deleteDraft = async (commandId: string) => {
  const { role } = getUserInfo();
  if (role === 'dev') {
    return addonApiController.atom.devApi.addons.deleteDraftOfDev({ commandId });
  }
  if (role === 'admin') {
    return addonApiController.atom.adminApi.addons.deleteDraftOfDev({ commandId });
  }
  throw new RoleException();
};
