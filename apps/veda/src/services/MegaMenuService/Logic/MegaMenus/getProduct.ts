import { megaMenuApiController } from 'services/MegaMenuService';
import { adapterGetMegaMenu } from 'services/MegaMenuService/Adapters/adapterGetMegaMenu';
import { ProductSection } from 'types/Sections';
import { RoleException } from 'utils/constants/constants';
import { getUserInfo } from 'utils/functions/getUserInfo';

export const getProductSection = async (commandId: string) => {
  const { role } = getUserInfo();
  if (role === 'admin') {
    const response = await megaMenuApiController.product.adminApi.mega_menu.getProduct({ commandId });
    return adapterGetMegaMenu(response) as ProductSection;
  }
  if (role === 'dev') {
    const response = await megaMenuApiController.product.devApi.mega_menu.getProduct({ commandId });
    return adapterGetMegaMenu(response) as ProductSection;
  }
  if (role === 'user') {
    const response = await megaMenuApiController.product.userApi.mega_menu.getProduct({ commandId });
    return adapterGetMegaMenu(response) as ProductSection;
  }
  throw new RoleException();
};
