import { addonApiController } from 'services/AddonService';
import { RoleException } from 'utils/constants/constants';
import { getUserInfo } from 'utils/functions/getUserInfo';

export const deleteCategoryOfProduct = async (commandId: string) => {
  const { role } = getUserInfo();
  if (role === 'admin') {
    return addonApiController.product.adminApi.category.deleteCategoryOfProduct({ commandId });
  }
  throw new RoleException();
};
