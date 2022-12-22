import { addonApiController } from 'services/AddonService';
import { RoleException } from 'utils/constants/constants';
import { getUserInfo } from 'utils/functions/getUserInfo';

export const getProducts = async (category: string, limit?: number) => {
  const { role } = getUserInfo();
  if (role === 'admin') {
    const response = await addonApiController.product.adminApi.addons.getProducts({ type: 'GET FIRST PAGE', category, size: limit });
    return response.info;
  }
  if (role === 'dev') {
    const response = await addonApiController.product.devApi.addons.getProducts({ type: 'GET FIRST PAGE', category, size: limit });
    return response.info;
  }
  if (role === 'user') {
    const response = await addonApiController.product.userApi.addons.getProducts({ type: 'GET FIRST PAGE', category, size: limit });
    return response.info;
  }
  throw new RoleException();
};

export const loadMoreProducts = async (category: string, cursor: string) => {
  const { role } = getUserInfo();
  if (role === 'admin') {
    const response = await addonApiController.product.adminApi.addons.getProducts({ type: 'LOADMORE', category, lastCursor: cursor });
    return response.info;
  }
  if (role === 'dev') {
    const response = await addonApiController.product.devApi.addons.getProducts({ type: 'LOADMORE', category, lastCursor: cursor });
    return response.info;
  }
  if (role === 'user') {
    const response = await addonApiController.product.userApi.addons.getProducts({ type: 'LOADMORE', category, lastCursor: cursor });
    return response.info;
  }
  throw new RoleException();
};
