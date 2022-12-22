import { SectionCategoryForFrontend } from 'services/SectionService/types';
import { RoleException } from 'utils/constants/constants';
import { getUserInfo } from 'utils/functions/getUserInfo';
import { themeApis } from '../apis';

export const getCategoriesOfThemeProduct = async () => {
  const { role } = getUserInfo();
  if (role === 'admin') {
    const response = await themeApis.vedaApplication.adminApi.category.getCategories({});

    const mapResponse = response.info.map<SectionCategoryForFrontend>(item => {
      return {
        quantity: '',
        quantityLeft: '',
        slug: item.name,
        title: item.description ? item.description : item.name,
        commandId: item.commandId,
      };
    });

    return mapResponse;
  }
  if (role === 'user') {
    const response = await themeApis.vedaApplication.userApi.category.getCategories({});
    const mapResponse = response.info.map<SectionCategoryForFrontend>(item => {
      return {
        quantity: '',
        quantityLeft: '',
        slug: item.name,
        title: item.description ? item.description : item.name,
        commandId: item.commandId,
      };
    });

    return mapResponse;
  }
  throw new RoleException();
};
