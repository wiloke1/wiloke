import { sectionApiController } from 'services/SectionService';
import { ProductSection } from 'types/Sections';
import { RoleException } from 'utils/constants/constants';
import { getUserInfo } from 'utils/functions/getUserInfo';

export const publishAtomToProduct = async (section: ProductSection) => {
  const { role } = getUserInfo();
  if (role === 'admin') {
    return sectionApiController.product.adminApi.sections.createProduct({ section: { ...section, commandId: undefined } });
  }
  throw new RoleException();
};
