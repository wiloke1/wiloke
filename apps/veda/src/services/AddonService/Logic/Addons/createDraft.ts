import { addonApiController } from 'services/AddonService';
import { adapterCreateOrUpdateAddon } from 'services/AddonService/Adapters/adapterCreateOrUpdateAddon';
import { DevAddon } from 'types/Addons';
import { RoleException } from 'utils/constants/constants';
import { getUserInfo } from 'utils/functions/getUserInfo';

export const createDraft = async (devAddon: DevAddon) => {
  const { role } = getUserInfo();
  if (role === 'dev') {
    const response = await addonApiController.atom.devApi.addons.createDraftOfDev({ addon: devAddon });
    return {
      info: adapterCreateOrUpdateAddon(response.info) as DevAddon,
      message: response.message,
    };
  }
  throw new RoleException();
};
