import { addonApiController } from 'services/AddonService';
import { adapterGetCategories } from 'services/AddonService/Adapters/adapterGetCategories';
import { RoleException } from 'utils/constants/constants';
import { getUserInfo } from 'utils/functions/getUserInfo';

export const getCategoriesOfProduct = async () => {
  const { role } = getUserInfo();
  if (role === 'admin') {
    const response = await addonApiController.product.adminApi.category.getCategories({ type: 'GET FIRST PAGE' });
    return adapterGetCategories(response.info);
  }
  if (role === 'dev') {
    const response = await addonApiController.product.devApi.category.getCategories({ type: 'GET FIRST PAGE' });
    return adapterGetCategories(response.info);
  }
  if (role === 'user') {
    const response = await addonApiController.product.userApi.category.getCategories({ type: 'GET FIRST PAGE' });
    return adapterGetCategories(response.info);
  }
  throw new RoleException();
};

export const loadMoreCategoriesOfProduct = async (cursor: string) => {
  const { role } = getUserInfo();
  if (role === 'admin') {
    const response = await addonApiController.product.adminApi.category.getCategories({ type: 'LOADMORE', cursor });
    return adapterGetCategories(response.info);
  }
  if (role === 'user') {
    const response = await addonApiController.product.userApi.category.getCategories({ type: 'LOADMORE', cursor });
    return adapterGetCategories(response.info);
  }
  throw new RoleException();
};
