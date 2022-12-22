import { addonApiController } from 'services/AddonService';
import { adapterCreateOrUpdateAddon } from 'services/AddonService/Adapters/adapterCreateOrUpdateAddon';
import { DevAddon } from 'types/Addons';
import { RoleException } from 'utils/constants/constants';
import { getUserInfo } from 'utils/functions/getUserInfo';

export const updateDraft = async (addon: DevAddon) => {
  const { role } = getUserInfo();
  if (role === 'admin') {
    const response = await addonApiController.atom.adminApi.addons.updateDraftOfDev({ addon });
    return {
      info: adapterCreateOrUpdateAddon(response.info) as DevAddon,
      message: response.message,
    };
  }
  if (role === 'dev') {
    const response = await addonApiController.atom.devApi.addons.updateDraftOfDev({ addon });
    return {
      info: adapterCreateOrUpdateAddon(response.info) as DevAddon,
      message: response.message,
    };
  }
  throw new RoleException();
};
