import { sectionApiController } from 'services/SectionService';
import { adapterGetCategories } from 'services/SectionService/Adapters/adapterGetCategories';
import { RoleException } from 'utils/constants/constants';
import { getUserInfo } from 'utils/functions/getUserInfo';

export const getCategoriesOfAtom = async () => {
  const { role } = getUserInfo();
  if (role === 'admin') {
    const response = await sectionApiController.atom.adminApi.category.getCategoriesOfAtom({ type: 'GET FIRST PAGE' });
    return adapterGetCategories(response.info);
  }
  if (role === 'dev') {
    const response = await sectionApiController.atom.publishApi.category.getCategoriesOfAtom({ type: 'GET FIRST PAGE' });
    return adapterGetCategories(response.info);
  }
  throw new RoleException();
};

export const loadMoreCategoriesOfAtom = async (cursor: string) => {
  const { role } = getUserInfo();
  if (role === 'admin') {
    const response = await sectionApiController.atom.adminApi.category.getCategoriesOfAtom({ type: 'LOADMORE', lastCursor: cursor });
    return adapterGetCategories(response.info);
  }
  if (role === 'dev') {
    const response = await sectionApiController.atom.publishApi.category.getCategoriesOfAtom({ type: 'LOADMORE', lastCursor: cursor });
    return adapterGetCategories(response.info);
  }
  throw new RoleException();
};
