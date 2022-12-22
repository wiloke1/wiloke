import { addonApiController } from 'services/AddonService';
import { RoleException } from 'utils/constants/constants';
import { getUserInfo } from 'utils/functions/getUserInfo';

export const forkAtom = async (parentCommandId: string) => {
  const { role } = getUserInfo();
  if (role === 'dev') {
    return addonApiController.atom.devApi.addons.forkAtom({ parentCommandId });
  }
  throw new RoleException();
};
