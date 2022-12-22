import { addonApiController } from 'services/AddonService';
import { adapterGetCategories } from 'services/AddonService/Adapters/adapterGetCategories';
import { RoleException } from 'utils/constants/constants';
import { getUserInfo } from 'utils/functions/getUserInfo';

export const getCategoriesOfDraft = async () => {
  const { role } = getUserInfo();
  if (role === 'admin') {
    const response = await addonApiController.atom.devApi.category.getCategoriesOfDraft({ type: 'GET FIRST PAGE' });
    return adapterGetCategories(response.info);
  }
  if (role === 'dev') {
    const response = await addonApiController.atom.devApi.category.getCategoriesOfDraft({ type: 'GET FIRST PAGE' });
    return adapterGetCategories(response.info);
  }
  throw new RoleException();
};

export const loadMoreCategoriesOfDraft = async (cursor: string) => {
  const { role } = getUserInfo();
  if (role === 'admin') {
    const response = await addonApiController.atom.devApi.category.getCategoriesOfDraft({ type: 'LOADMORE', cursor });
    return adapterGetCategories(response.info);
  }
  if (role === 'dev') {
    const response = await addonApiController.atom.devApi.category.getCategoriesOfDraft({ type: 'LOADMORE', cursor });
    return adapterGetCategories(response.info);
  }
  throw new RoleException();
};
