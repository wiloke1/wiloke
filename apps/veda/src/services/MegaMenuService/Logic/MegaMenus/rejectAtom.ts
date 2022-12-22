import { megaMenuApiController } from 'services/MegaMenuService';
import { RoleException } from 'utils/constants/constants';
import { getUserInfo } from 'utils/functions/getUserInfo';

export const rejectAtom = async (commandId: string, devId?: number, comment?: string) => {
  const { role } = getUserInfo();
  if (role === 'admin') {
    return megaMenuApiController.atom.adminApi.mega_menu.rejectAtom({ commandId, devId, comment });
  }
  throw new RoleException();
};
