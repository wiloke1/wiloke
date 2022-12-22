import { addonApiController } from 'services/AddonService';
import { DevAddon } from 'types/Addons';
import { RoleException } from 'utils/constants/constants';
import { getUserInfo } from 'utils/functions/getUserInfo';

export const rejectDraft = async (addon: DevAddon) => {
  const { role } = getUserInfo();
  if (role === 'admin') {
    return addonApiController.atom.adminApi.addons.updateDraftOfDev({ addon: { ...addon, status: 'pending' } });
  }
  throw new RoleException();
};
