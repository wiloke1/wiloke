import { megaMenuApiController } from 'services/MegaMenuService';
import { RoleException } from 'utils/constants/constants';
import { getUserInfo } from 'utils/functions/getUserInfo';

export const approveDraftToAdmin = async (devCommandId: string) => {
  const { role } = getUserInfo();
  if (role === 'admin') {
    return megaMenuApiController.atom.adminApi.mega_menu.approveDraftToAtom({ commandId: devCommandId });
  }
  throw new RoleException();
};
