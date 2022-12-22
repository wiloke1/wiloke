import { addonApiController } from 'services/AddonService';
import { RoleException } from 'utils/constants/constants';
import { getUserInfo } from 'utils/functions/getUserInfo';

export const getAtoms = async (category: string) => {
  const { role } = getUserInfo();
  if (role === 'admin') {
    const response = await addonApiController.atom.adminApi.addons.getAtoms({ type: 'GET FIRST PAGE', category });
    return response.info;
  }
  if (role === 'dev') {
    const response = await addonApiController.atom.publishApi.addons.getAtoms({ type: 'GET FIRST PAGE', category });
    return response.info;
  }
  throw new RoleException();
};

export const loadMoreAtoms = async (category: string, cursor: string) => {
  const { role } = getUserInfo();
  if (role === 'admin') {
    const response = await addonApiController.atom.adminApi.addons.getAtoms({ type: 'LOADMORE', category, lastCursor: cursor });
    return response.info;
  }
  if (role === 'dev') {
    const response = await addonApiController.atom.publishApi.addons.getAtoms({ type: 'LOADMORE', category, lastCursor: cursor });
    return response.info;
  }
  throw new RoleException();
};
