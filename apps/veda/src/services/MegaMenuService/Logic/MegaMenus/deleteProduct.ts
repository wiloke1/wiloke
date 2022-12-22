import { megaMenuApiController } from 'services/MegaMenuService';
import { RoleException } from 'utils/constants/constants';
import { getUserInfo } from 'utils/functions/getUserInfo';

export const deleteProductSection = async (commandId: string) => {
  const { role } = getUserInfo();
  if (role === 'admin') {
    return megaMenuApiController.product.adminApi.mega_menu.deleteProduct({ commandId });
  }
  throw new RoleException();
};
