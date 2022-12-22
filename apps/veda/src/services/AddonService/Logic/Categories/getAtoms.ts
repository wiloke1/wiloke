import { addonApiController } from 'services/AddonService';
import { adapterGetCategories } from 'services/AddonService/Adapters/adapterGetCategories';
import { RoleException } from 'utils/constants/constants';
import { getUserInfo } from 'utils/functions/getUserInfo';

export const getCategoriesOfAtom = async () => {
  const { role } = getUserInfo();
  if (role === 'admin') {
    const response = await addonApiController.atom.adminApi.category.getCategoriesOfAtom({ type: 'GET FIRST PAGE' });
    return adapterGetCategories(response.info);
  }
  if (role === 'dev') {
    const response = await addonApiController.atom.publishApi.category.getCategoriesOfAtom({ type: 'GET FIRST PAGE' });
    return adapterGetCategories(response.info);
  }
  throw new RoleException();
};

export const loadMoreCategoriesOfAtom = async (cursor: string) => {
  const { role } = getUserInfo();
  if (role === 'admin') {
    const response = await addonApiController.atom.adminApi.category.getCategoriesOfAtom({ type: 'LOADMORE', cursor });
    return adapterGetCategories(response.info);
  }
  if (role === 'dev') {
    const response = await addonApiController.atom.publishApi.category.getCategoriesOfAtom({ type: 'LOADMORE', cursor });
    return adapterGetCategories(response.info);
  }
  throw new RoleException();
};
