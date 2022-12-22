import { RoleException } from 'utils/constants/constants';
import { getUserInfo } from 'utils/functions/getUserInfo';
import { pageApis } from '../apis';

interface CreateCategoryOfPageProduct {
  name: string;
  description: string;
}

export const createCategoryOfPageProduct = ({ description, name }: CreateCategoryOfPageProduct) => {
  const { role } = getUserInfo();
  if (role === 'admin') {
    return pageApis.vedaApplication.adminApi.category.createCategory({
      category: { description, name },
    });
  }
  throw new RoleException();
};
