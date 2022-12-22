import { sectionApiController } from 'services/SectionService';
import { SectionEnvatoCategory } from 'types/Sections';
import { RoleException } from 'utils/constants/constants';
import { getUserInfo } from 'utils/functions/getUserInfo';

export const updateProduct = ({ commandId, description, envatoItemId, name }: SectionEnvatoCategory) => {
  const { role } = getUserInfo();

  if (role === 'admin') {
    return sectionApiController.product.adminApi.envato.updateCategory({ commandId, description, envatoItemId, name });
  }
  if (role === 'dev') {
    return sectionApiController.product.devApi.envato.updateCategory({ commandId, description, envatoItemId, name });
  }

  throw new RoleException();
};
