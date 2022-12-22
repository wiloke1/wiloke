import { RoleException } from 'utils/constants/constants';
import { getUserInfo } from 'utils/functions/getUserInfo';
import { sectionApiController } from 'services/SectionService';

export const deleteProductSection = async (commandId: string) => {
  const { role } = getUserInfo();
  if (role === 'admin') {
    return sectionApiController.product.adminApi.sections.deleteProduct({ commandId });
  }
  throw new RoleException();
};
