import { megaMenuApiController } from 'services/MegaMenuService';
import { adapterGetMegaMenus } from 'services/MegaMenuService/Adapters/adapterGetMegaMenus';
import { ProductSection } from 'types/Sections';
import { RoleException } from 'utils/constants/constants';
import { getUserInfo } from 'utils/functions/getUserInfo';

export const getProductSections = async (categoryName: string) => {
  const { role } = getUserInfo();
  if (role === 'admin') {
    const response = await megaMenuApiController.product.adminApi.mega_menu.getProducts({ type: 'GET FIRST PAGE', category: categoryName });
    return adapterGetMegaMenus(response.info) as ProductSection[];
  }
  if (role === 'dev') {
    const response = await megaMenuApiController.product.devApi.mega_menu.getProducts({ type: 'GET FIRST PAGE', category: categoryName });
    return adapterGetMegaMenus(response.info) as ProductSection[];
  }
  if (role === 'user') {
    const response = await megaMenuApiController.product.userApi.mega_menu.getProducts({ type: 'GET FIRST PAGE', category: categoryName });
    return adapterGetMegaMenus(response.info) as ProductSection[];
  }
  throw new RoleException();
};

export const loadMoreProductSections = async (categoryName: string, cursor: string) => {
  const { role } = getUserInfo();
  if (role === 'admin') {
    const response = await megaMenuApiController.product.adminApi.mega_menu.getProducts({
      type: 'LOADMORE',
      category: categoryName,
      lastCursor: cursor,
    });
    return adapterGetMegaMenus(response.info) as ProductSection[];
  }
  if (role === 'dev') {
    const response = await megaMenuApiController.product.devApi.mega_menu.getProducts({
      type: 'LOADMORE',
      category: categoryName,
      lastCursor: cursor,
    });
    return adapterGetMegaMenus(response.info) as ProductSection[];
  }
  if (role === 'user') {
    const response = await megaMenuApiController.product.userApi.mega_menu.getProducts({
      type: 'LOADMORE',
      category: categoryName,
      lastCursor: cursor,
    });
    return adapterGetMegaMenus(response.info) as ProductSection[];
  }
  throw new RoleException();
};
