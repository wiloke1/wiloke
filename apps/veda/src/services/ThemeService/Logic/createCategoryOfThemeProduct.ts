import { RoleException } from 'utils/constants/constants';
import { getUserInfo } from 'utils/functions/getUserInfo';
import { themeApis } from '../apis';

interface CreateCategoryOfThemeProduct {
  name: string;
  description: string;
}

export const createCategoryOfThemeProduct = ({ description, name }: CreateCategoryOfThemeProduct) => {
  const { role } = getUserInfo();
  if (role === 'admin') {
    return themeApis.vedaApplication.adminApi.category.createCategory({
      category: { description, name },
    });
  }
  throw new RoleException();
};
