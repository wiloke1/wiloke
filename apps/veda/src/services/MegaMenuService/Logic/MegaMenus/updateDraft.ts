import { megaMenuApiController } from 'services/MegaMenuService';
import { DevSection } from 'types/Sections';
import { RoleException } from 'utils/constants/constants';
import { getUserInfo } from 'utils/functions/getUserInfo';

export const updateDraftSection = async (section: DevSection) => {
  const { role } = getUserInfo();
  if (role === 'dev') {
    return megaMenuApiController.atom.devApi.mega_menu.updateDraftOfDev({ section });
  }
  if (role === 'admin') {
    return megaMenuApiController.atom.adminApi.mega_menu.updateDraftOfDev({ section });
  }
  throw new RoleException();
};
