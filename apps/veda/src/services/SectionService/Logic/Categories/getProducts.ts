import { sectionApiController } from 'services/SectionService';
import { adapterGetCategories } from 'services/SectionService/Adapters/adapterGetCategories';
import { RoleException } from 'utils/constants/constants';
import { getUserInfo } from 'utils/functions/getUserInfo';

export const getCategoriesOfProduct = async () => {
  const { role } = getUserInfo();
  if (role === 'admin') {
    const response = await sectionApiController.product.adminApi.category.getCategories({ type: 'GET FIRST PAGE' });
    return adapterGetCategories(response.info);
  }
  if (role === 'dev') {
    const response = await sectionApiController.product.devApi.category.getCategories({ type: 'GET FIRST PAGE' });
    return adapterGetCategories(response.info);
  }
  if (role === 'user') {
    const response = await sectionApiController.product.userApi.category.getCategories({ type: 'GET FIRST PAGE' });
    return adapterGetCategories(response.info);
  }
  throw new RoleException();
};

export const loadMoreCategoriesOfProduct = async (cursor: string) => {
  const { role } = getUserInfo();
  if (role === 'admin') {
    const response = await sectionApiController.product.adminApi.category.getCategories({ type: 'LOADMORE', cursor });
    return adapterGetCategories(response.info);
  }
  if (role === 'dev') {
    const response = await sectionApiController.product.devApi.category.getCategories({ type: 'LOADMORE', cursor });
    return adapterGetCategories(response.info);
  }
  if (role === 'user') {
    const response = await sectionApiController.product.userApi.category.getCategories({ type: 'LOADMORE', cursor });
    return adapterGetCategories(response.info);
  }
  throw new RoleException();
};
