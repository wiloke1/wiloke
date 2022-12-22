import { megaMenuApiController } from 'services/MegaMenuService';
import { DevSection } from 'types/Sections';
import { RoleException } from 'utils/constants/constants';
import { getUserInfo } from 'utils/functions/getUserInfo';

export const rejectDraft = async (devSection: DevSection) => {
  const { role } = getUserInfo();
  if (role === 'admin') {
    return megaMenuApiController.atom.adminApi.mega_menu.updateDraftOfDev({ section: { ...devSection, status: 'pending' } });
  }
  throw new RoleException();
};
