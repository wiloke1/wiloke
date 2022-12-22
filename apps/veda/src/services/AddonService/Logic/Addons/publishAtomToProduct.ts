import { addonApiController } from 'services/AddonService';
import { ProductAddon } from 'types/Addons';
import { RoleException } from 'utils/constants/constants';
import { getUserInfo } from 'utils/functions/getUserInfo';

export const publishAtomToProduct = async (addon: ProductAddon) => {
  const { role } = getUserInfo();
  if (role === 'admin') {
    return addonApiController.product.adminApi.addons.createProduct({ addon: { ...addon, commandId: undefined } });
  }
  throw new RoleException();
};
