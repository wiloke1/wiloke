import { addonApiController } from 'services/AddonService';
import { RoleException } from 'utils/constants/constants';
import { getUserInfo } from 'utils/functions/getUserInfo';

export const getDrafts = async (category: string) => {
  const { role } = getUserInfo();
  if (role === 'admin') {
    const response = await addonApiController.atom.adminApi.addons.getDraftsOfDev({ type: 'GET FIRST PAGE', category });
    return response.info;
  }
  if (role === 'dev') {
    const response = await addonApiController.atom.devApi.addons.getDraftsOfDev({ type: 'GET FIRST PAGE', category });
    return response.info;
  }
  throw new RoleException();
};

export const loadMoreDrafts = async (category: string, cursor: string) => {
  const { role } = getUserInfo();
  if (role === 'admin') {
    const response = await addonApiController.atom.adminApi.addons.getDraftsOfDev({ type: 'LOADMORE', category, lastCursor: cursor });
    return response.info;
  }
  if (role === 'dev') {
    const response = await addonApiController.atom.devApi.addons.getDraftsOfDev({ type: 'LOADMORE', category, lastCursor: cursor });
    return response.info;
  }
  throw new RoleException();
};
