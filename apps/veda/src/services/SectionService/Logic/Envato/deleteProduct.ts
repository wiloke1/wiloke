import { sectionApiController } from 'services/SectionService';
import { RoleException } from 'utils/constants/constants';
import { getUserInfo } from 'utils/functions/getUserInfo';

export const deleteProduct = ({ commandId }: { commandId: string }) => {
  const { role } = getUserInfo();

  if (role === 'admin') {
    return sectionApiController.product.adminApi.envato.deleteCategoryOfEnvato({ commandId });
  }
  if (role === 'dev') {
    return sectionApiController.product.devApi.envato.deleteCategoryOfEnvato({ commandId });
  }

  throw new RoleException();
};
