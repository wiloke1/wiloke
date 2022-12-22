import { addonApiController } from 'services/AddonService';
import { RoleException } from 'utils/constants/constants';
import { getUserInfo } from 'utils/functions/getUserInfo';

export const getProduct = async (commandId: string) => {
  const { role } = getUserInfo();
  if (role === 'admin') {
    const response = await addonApiController.product.adminApi.addons.getProduct({ commandId });
    return response;
  }
  if (role === 'dev') {
    const response = await addonApiController.product.devApi.addons.getProduct({ commandId });
    return response;
  }
  if (role === 'user') {
    const response = await addonApiController.product.userApi.addons.getProduct({ commandId });
    return response;
  }
  throw new RoleException();
};
