import { RoleException } from 'utils/constants/constants';
import { getUserInfo } from 'utils/functions/getUserInfo';
import { pageApis } from '../apis';

export const deleteMegaMenusOfPageAtom = async ({ commandId }: { commandId: string }) => {
  const { role } = getUserInfo();
  if (role === 'admin') {
    return pageApis.atom.adminApi.megamenu.deleteDeleteMegaMenuOfAtom({ commandId });
  }

  throw new RoleException();
};
