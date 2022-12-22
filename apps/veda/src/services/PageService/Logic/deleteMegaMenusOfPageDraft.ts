import { RoleException } from 'utils/constants/constants';
import { getUserInfo } from 'utils/functions/getUserInfo';
import { pageApis } from '../apis';

export const deleteMegaMenusOfPageDraft = async ({ commandId }: { commandId: string }) => {
  const { role } = getUserInfo();
  if (role === 'admin') {
    return pageApis.atom.adminApi.megamenu.deleteDeleteMegaMenuOfDraft({ commandId });
  }
  if (role === 'dev') {
    return pageApis.atom.devApi.megamenu.deleteDeleteMegaMenuOfDraft({ commandId });
  }

  throw new RoleException();
};
