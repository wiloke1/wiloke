import { megaMenuApiController } from 'services/MegaMenuService';
import { RoleException } from 'utils/constants/constants';
import { getUserInfo } from 'utils/functions/getUserInfo';

export const deleteAtomSection = async (commandId: string) => {
  const { role } = getUserInfo();
  if (role === 'admin') {
    return megaMenuApiController.atom.adminApi.mega_menu.deleteAtom({ commandId });
  }
  throw new RoleException();
};
