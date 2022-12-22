import { sectionApiController } from 'services/SectionService';
import { adapterGetSection } from 'services/SectionService/Adapters/adapterGetSection';
import { ProductSection } from 'types/Sections';
import { RoleException } from 'utils/constants/constants';
import { getUserInfo } from 'utils/functions/getUserInfo';

export const getProductSection = async (commandId: string) => {
  const { role } = getUserInfo();
  if (role === 'admin') {
    const response = await sectionApiController.product.adminApi.sections.getProduct({ commandId });
    return adapterGetSection(response) as ProductSection;
  }
  if (role === 'dev') {
    const response = await sectionApiController.product.devApi.sections.getProduct({ commandId });
    return adapterGetSection(response) as ProductSection;
  }
  if (role === 'user') {
    const response = await sectionApiController.product.userApi.sections.getProduct({ commandId });
    return adapterGetSection(response) as ProductSection;
  }
  throw new RoleException();
};
