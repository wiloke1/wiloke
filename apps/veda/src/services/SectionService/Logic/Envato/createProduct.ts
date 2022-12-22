import { sectionApiController } from 'services/SectionService';
import { RoleException } from 'utils/constants/constants';
import { getUserInfo } from 'utils/functions/getUserInfo';

export const createProduct = ({ description, name, envatoItemId }: { description: string; name: string; envatoItemId: string }) => {
  const { role } = getUserInfo();

  if (role === 'admin') {
    return sectionApiController.product.adminApi.envato.createCategory({ description, name, envatoItemId });
  }
  if (role === 'dev') {
    return sectionApiController.product.devApi.envato.createCategory({ description, name, envatoItemId });
  }

  throw new RoleException();
};
