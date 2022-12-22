import { sectionApiController } from 'services/SectionService';
import { RoleException } from 'utils/constants/constants';
import { getUserInfo } from 'utils/functions/getUserInfo';

export const getProduct = ({ commandId }: { commandId: string }) => {
  const { role } = getUserInfo();

  if (role === 'admin') {
    return sectionApiController.product.adminApi.envato.getCategory({ commandId });
  }
  if (role === 'dev') {
    return sectionApiController.product.devApi.envato.getCategory({ commandId });
  }
  if (role === 'user') {
    return sectionApiController.product.userApi.envato.getCategory({ commandId });
  }

  throw new RoleException();
};
