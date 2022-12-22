import { ProductSection } from 'types/Sections';
import { RoleException } from 'utils/constants/constants';
import { getUserInfo } from 'utils/functions/getUserInfo';
import { sectionApiController } from 'services/SectionService';
import { adapterGetManySections } from 'services/SectionService/Adapters/adapterGetManySections';

export const getProductSections = async (categoryName: string, size?: number) => {
  const { role } = getUserInfo();
  if (role === 'admin') {
    const response = await sectionApiController.product.adminApi.sections.getProducts({ type: 'GET FIRST PAGE', category: categoryName, size });
    return adapterGetManySections(response.info) as ProductSection[];
  }
  if (role === 'dev') {
    const response = await sectionApiController.product.devApi.sections.getProducts({ type: 'GET FIRST PAGE', category: categoryName, size });
    return adapterGetManySections(response.info) as ProductSection[];
  }
  if (role === 'user') {
    const response = await sectionApiController.product.userApi.sections.getProducts({ type: 'GET FIRST PAGE', category: categoryName, size });
    return adapterGetManySections(response.info) as ProductSection[];
  }
  throw new RoleException();
};

export const loadMoreProductSections = async (categoryName: string, cursor: string) => {
  const { role } = getUserInfo();
  if (role === 'admin') {
    const response = await sectionApiController.product.adminApi.sections.getProducts({
      type: 'LOADMORE',
      category: categoryName,
      lastCursor: cursor,
    });
    return adapterGetManySections(response.info) as ProductSection[];
  }
  if (role === 'dev') {
    const response = await sectionApiController.product.devApi.sections.getProducts({ type: 'LOADMORE', category: categoryName, lastCursor: cursor });
    return adapterGetManySections(response.info) as ProductSection[];
  }
  if (role === 'user') {
    const response = await sectionApiController.product.userApi.sections.getProducts({
      type: 'LOADMORE',
      category: categoryName,
      lastCursor: cursor,
    });
    return adapterGetManySections(response.info) as ProductSection[];
  }
  throw new RoleException();
};
