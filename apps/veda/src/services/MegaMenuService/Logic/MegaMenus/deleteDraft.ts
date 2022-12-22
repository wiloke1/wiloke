import { megaMenuApiController } from 'services/MegaMenuService';
import { RoleException } from 'utils/constants/constants';
import { getUserInfo } from 'utils/functions/getUserInfo';

export const deleteDraftSection = async (commandId: string) => {
  const { role } = getUserInfo();
  if (role === 'dev') {
    return megaMenuApiController.atom.devApi.mega_menu.deleteDraftOfDev({ commandId });
  }
  if (role === 'admin') {
    return megaMenuApiController.atom.adminApi.mega_menu.deleteDraftOfDev({ commandId });
  }
  throw new RoleException();
};
