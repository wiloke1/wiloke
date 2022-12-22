import { megaMenuApiController } from 'services/MegaMenuService';
import { adapterGetCategories } from 'services/SectionService/Adapters/adapterGetCategories';
import { RoleException } from 'utils/constants/constants';
import { getUserInfo } from 'utils/functions/getUserInfo';

export const getCategoriesOfDraft = async () => {
  const { role } = getUserInfo();
  if (role === 'dev') {
    const response = await megaMenuApiController.atom.devApi.category.getCategoriesOfDraft({ type: 'GET FIRST PAGE' });
    return adapterGetCategories(response.info);
  }
  if (role === 'admin') {
    const response = await megaMenuApiController.atom.devApi.category.getCategoriesOfDraft({ type: 'GET FIRST PAGE' });
    return adapterGetCategories(response.info);
  }
  throw new RoleException();
};

export const loadMoreCategoriesOfDraft = async (cursor: string) => {
  const { role } = getUserInfo();
  if (role === 'dev') {
    const response = await megaMenuApiController.atom.devApi.category.getCategoriesOfDraft({ type: 'LOADMORE', cursor });
    return adapterGetCategories(response.info);
  }
  if (role === 'admin') {
    const response = await megaMenuApiController.atom.devApi.category.getCategoriesOfDraft({ type: 'LOADMORE', cursor });
    return adapterGetCategories(response.info);
  }
  throw new RoleException();
};
